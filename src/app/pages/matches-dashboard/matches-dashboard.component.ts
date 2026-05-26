import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';

import { StatsService } from '../../service/stats-services/stats.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matches-dashboard',
  standalone: true,
  imports: [FooterComponent, SidebarComponent],
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
  isActMenuOpen: boolean = false;
  myPuuid: string = "";


  constructor(private statsService: StatsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Usiamo trim() per evitare problemi con spazi bianchi
      this.name = params['name']?.trim();
      this.tag = params['tag']?.trim();

      if (this.name && this.tag) {
        this.fetchMatches();
      }
    });

    // Caricamento Ranghi
    this.statsService.getRankTiers().subscribe((tiersRes: any) => {
      if (tiersRes.data && tiersRes.data.length > 0) {
        const lastEpisode = tiersRes.data[tiersRes.data.length - 1];
        lastEpisode.tiers.forEach((t: any) => {
          this.rankMap[t.tier] = t.largeIcon;
        });
      }
    });

    // Caricamento Stagioni
    this.statsService.getSeasons().subscribe({
      next: (res: any) => {
        this.availableActs = res.data
          .filter((s: any) => s.type?.includes('Act') || (s.displayName.startsWith('ACT') && !s.displayName.includes('Border')))
          .map((s: any) => ({
            id: s.uuid,
            displayName: s.title || s.displayName
          }))
          .reverse();

        if (this.availableActs.length > 0) {
          this.selectedAct = this.availableActs[0].displayName;
        }
      }
    });
  }

  // --- LOGICA FILTRI ---
  // Trasformato in funzione per sicurezza o mantenuto come getter, 
  // ma assicuriamoci che i nomi delle modalità coincidano con l'API
  get filteredMatches() {
    if (!this.allMatches) return [];
    if (this.selectedMode === 'all') return this.allMatches;

    return this.allMatches.filter(m => {
      const mode = m.metadata?.mode?.toLowerCase() || '';
      return mode.includes(this.selectedMode.toLowerCase());
    });
  }

  fetchMatches() {
    this.isLoading = true;
    this.openedMatchId = null;

    // Definiamo cleanName e cleanTag qui dentro
    const cleanName = this.name.trim();
    const cleanTag = this.tag.trim();

    this.statsService.getDashboardData('eu', cleanName, cleanTag).subscribe({
      next: (data) => {
        if (data && data.matches && data.matches.length > 0) {
          this.allMatches = data.matches;

          // Cerchiamo il tuo PUUID nei giocatori del primo match
          const firstMatch = data.matches[0];
          const allPlayers = [...firstMatch.players.blue, ...firstMatch.players.red];

          // Usiamo cleanName definito poche righe sopra
          const me = allPlayers.find(p =>
            p.name?.toLowerCase() === cleanName.toLowerCase() &&
            p.tag?.toLowerCase() === cleanTag.toLowerCase()
          );

          if (me) {
            this.myPuuid = me.puuid;
            console.log("✅ PUUID TROVATO:", this.myPuuid);
          } else if (allPlayers.length > 0) {
            // Fallback se i nomi sono oscurati (#)
            this.myPuuid = allPlayers[0].puuid;
          }

          this.calculateStatsFromMatches(this.allMatches);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
  getMyStats(match: any) {
    if (!match || !match.players) return null;
    const players = [...match.players.blue, ...match.players.red];

    // Se abbiamo il PUUID, usiamolo (è l'unico valore non censurato)
    if (this.myPuuid) {
      const found = players.find(p => p.puuid === this.myPuuid);
      if (found) return found;
    }

    // Fallback estremo per mostrare comunque la partita nell'HTML
    return players.find(p => p.name?.toLowerCase() === this.name.toLowerCase()) || players[0];
  }

  calculateStatsFromMatches(matches: any[]) {
    let totalKills = 0;
    let totalDeaths = 0;
    let totalWins = 0;
    let totalHeadshots = 0;
    let totalHits = 0;

    matches.forEach(match => {
      // Usiamo la funzione esistente per trovare i tuoi dati nel match
      const me = this.getMyStats(match);

      if (me && me.stats) {
        // Accumulo Kills e Deaths
        totalKills += me.stats.kills || 0;
        totalDeaths += me.stats.deaths || 0;

        // Calcolo Vittoria
        // Verifichiamo se il tuo team ha vinto
        const myTeam = me.team.toLowerCase();
        if (match.teams && match.teams[myTeam] && match.teams[myTeam].has_won) {
          totalWins++;
        }

        // Accumulo Headshots per Precisione
        const hs = me.stats.headshots || 0;
        const bs = me.stats.bodyshots || 0;
        const ls = me.stats.legshots || 0;
        totalHeadshots += hs;
        totalHits += (hs + bs + ls);
      }
    });

    // Assegnazione alle variabili usate nell'HTML
    this.winRate = Math.round((totalWins / matches.length) * 100);
    this.kdRatio = (totalKills / (totalDeaths || 1)).toFixed(2);
    this.hsPrecision = totalHits > 0 ? Math.round((totalHeadshots / totalHits) * 100) : 0;

    console.log("Statistiche ricalcolate:", {
      winRate: this.winRate,
      kd: this.kdRatio,
      hs: this.hsPrecision
    });
  }



  didIWin(match: any): boolean {
    const me = this.getMyStats(match);
    if (!me || !match.teams) return false;

    const myTeam = me.team.toLowerCase();
    // L'API di Henrik di solito ha match.teams.blue e match.teams.red
    return match.teams[myTeam]?.has_won === true;
  }

  calculateHS(playerStats: any): number {
    if (!playerStats) return 0;
    const headshots = playerStats.headshots || 0;
    const bodyshots = playerStats.bodyshots || 0;
    const legshots = playerStats.legshots || 0;

    const totalHits = headshots + bodyshots + legshots;
    return totalHits > 0 ? Math.round((headshots / totalHits) * 100) : 0;
  }

  toggleMatchDetails(matchId: string) {
    this.openedMatchId = this.openedMatchId === matchId ? null : matchId;
  }

  changeAct(act: any) {
    this.selectedAct = act.displayName;
    this.isActMenuOpen = false;
    this.fetchMatches();
  }
}