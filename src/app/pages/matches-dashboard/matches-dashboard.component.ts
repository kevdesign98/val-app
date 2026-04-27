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

  // Filtro Act
  currentAct: string = 'V26: A2';
  showActMenu: boolean = false;

  selectAct(actId: string) {
    this.currentAct = actId;
    this.showActMenu = false;
    this.fetchMatches(); // Ricarica i dati con il nuovo filtro
  }

  constructor(private statsService: StatsService, private route: ActivatedRoute) { }

  fetchMatches() {
    this.isLoading = true;

    // Usiamo il metodo del tuo StatsService
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.tag = params['tag'];

      if (this.name && this.tag) {
        this.fetchMatches(); // <--- Nome aggiornato qui
      }
    });
    this.statsService.getRankTiers().subscribe((tiersRes: any) => {
      // Prendiamo l'ultimo episodio disponibile
      const lastEpisode = tiersRes.data[tiersRes.data.length - 1];

      // Creiamo una mappa: { 21: 'url_icona_platino', 22: 'url_icona_platino2', ... }
      lastEpisode.tiers.forEach((t: any) => {
        this.rankMap[t.tier] = t.largeIcon;
      });
    });
  }

  loadData() {
    this.isLoading = true;
    // Chiamata al tuo nuovo metodo del service
    this.statsService.getDashboardData('eu', this.name, this.tag).subscribe({
      next: (data) => {
        this.allMatches = data.matches;
        this.winRate = data.stats.winrate;
        this.kdRatio = data.stats.kd;
        this.hsPrecision = data.stats.hs;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Errore API:", err);
        this.isLoading = false;
      }
    });
  }

  // Helper per trovare TE STESSO tra i 10 giocatori del match
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
    if (this.openedMatchId === matchId) {
      this.openedMatchId = null; // Se è già aperto, lo chiudiamo
    } else {
      this.openedMatchId = matchId; // Altrimenti apriamo quello cliccato
    }
  }


}