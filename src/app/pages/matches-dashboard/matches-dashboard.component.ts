import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../service/stats-services/stats.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-matches-dashboard',
  standalone: true,
  imports: [FooterComponent, CommonModule, SidebarComponent],
  templateUrl: './matches-dashboard.component.html',
  styleUrl: './matches-dashboard.component.css'
})
export class MatchesDashboardComponent implements OnInit {
  name: string = '';
  tag: string = '';
  isLoading: boolean = true;

  // Dati dinamici
  allMatches: any[] = [];
  winRate: number = 0;
  kdRatio: string = '0.00';
  hsPrecision: number = 0;
  openedMatchId: string | null = null;
  rankMap: { [key: number]: string } = {};

  // Filtri e Menu
  selectedMode: string = 'all';
  selectedAct: string = '';
  availableActs: any[] = [];
  isActMenuOpen: boolean = false; // Gestisce l'apertura del menu a click

  constructor(private statsService: StatsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.tag = params['tag'];

      if (this.name && this.tag) {
        this.fetchMatches();
      }
    });

    // Caricamento Ranghi
    this.statsService.getRankTiers().subscribe((tiersRes: any) => {
      const lastEpisode = tiersRes.data[tiersRes.data.length - 1];
      lastEpisode.tiers.forEach((t: any) => {
        this.rankMap[t.tier] = t.largeIcon;
      });

      // Caricamento Stagioni (Atti)
      this.statsService.getSeasons().subscribe({
        next: (res: any) => {
          // Filtriamo gli atti e usiamo il 'title' (es: Episode 9 // Act 2) se disponibile
          this.availableActs = res.data
            .filter((s: any) => s.type?.includes('Act') || (s.displayName.startsWith('ACT') && !s.displayName.includes('Border')))
            .map((s: any) => ({
              id: s.uuid,
              displayName: s.title || s.displayName // Preferisce il titolo completo
            }))
            .reverse();

          if (this.availableActs.length > 0) {
            this.selectedAct = this.availableActs[0].displayName;
          }
        },
        error: (err) => console.error('Errore nel recupero atti:', err)
      });
    });
  }

  // Logica Filtri
  get filteredMatches() {
    if (this.selectedMode === 'all') return this.allMatches;
    return this.allMatches.filter(m => m.metadata.mode.toLowerCase() === this.selectedMode.toLowerCase());
  }

  get weaponStats() {
    const stats: any = {};

    this.allMatches.forEach(match => {
      const me = match.players.all_players.find((p: any) => p.name.toLowerCase() === this.name.toLowerCase());
      if (!me) return;

      // Nota: Henrik API v3 fornisce le kill dettagliate
      match.kills.forEach((kill: any) => {
        if (kill.killer_display_name.toLowerCase() === (this.name + '#' + this.tag).toLowerCase()) {
          const weaponName = kill.damage_weapon_name || 'Ability';
          if (!stats[weaponName]) {
            stats[weaponName] = { name: weaponName, kills: 0, icon: kill.damage_weapon_assets?.display_icon };
          }
          stats[weaponName].kills++;
        }
      });
    });

    // Trasformiamo in array e ordiniamo per kill
    return Object.values(stats).sort((a: any, b: any) => b.kills - a.kills).slice(0, 5);
  }

  changeAct(act: any) {
    this.selectedAct = act.displayName;
    this.isActMenuOpen = false; // Chiude il menu
    this.fetchMatches(); // Ricarica i dati per quell'atto
  }

  fetchMatches() {
    this.isLoading = true;
    this.statsService.getDashboardData('eu', this.name, this.tag).subscribe({
      next: (data) => {
        this.allMatches = data.matches;
        this.winRate = data.stats.winrate;
        this.kdRatio = data.stats.kd;
        this.hsPrecision = data.stats.hs;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Errore nel caricamento:", err);
        this.isLoading = false;
      }
    });
  }

  // Helper Stats
  getMyStats(match: any) {
    return match.players.all_players.find((p: any) =>
      p.name.toLowerCase() === this.name.toLowerCase()
    );
  }

  didIWin(match: any): boolean {
    const me = this.getMyStats(match);
    if (!me) return false;
    const myTeam = me.team.toLowerCase() as 'red' | 'blue';
    return match.teams[myTeam].has_won;
  }

  calculateHS(playerStats: any): number {
    const totalHits = playerStats.headshots + playerStats.bodyshots + playerStats.legshots;
    return totalHits > 0 ? Math.round((playerStats.headshots / totalHits) * 100) : 0;
  }

  toggleMatchDetails(matchId: string) {
    this.openedMatchId = this.openedMatchId === matchId ? null : matchId;
  }
}