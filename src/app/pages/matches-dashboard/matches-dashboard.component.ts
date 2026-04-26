import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../service/stats-services/stats.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
@Component({
  selector: 'app-matches-dashboard',
  standalone: true,
  imports: [FooterComponent, CommonModule, SidebarComponent],
  templateUrl: './matches-dashboard.component.html',
  styleUrl: './matches-dashboard.component.css'
})
export class MatchesDashboardComponent implements OnInit {
  allMatches: any[] = [];
  winRate: number = 0;
  name: string = 'Lazarus'; // Questi dovrebbero venire da un servizio di Auth o input
  tag: string = 'BMTH';
  isLoading: boolean = true;

  // In matches-dashboard.component.ts
  currentAct: string = 'v26-a2'; // Act di default
  showActMenu: boolean = false;

  acts = [
    { id: 'v26-a2', name: 'V26: A2' },
    { id: 'v26-a1', name: 'V26: A1' },
    { id: 'v25-a6', name: 'V25: A6' },

  ];

  selectAct(actId: string) {
    this.currentAct = actId;
    this.showActMenu = false;
    this.fetchMatches(); // Ricarica i dati con il nuovo filtro
  }

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.fetchMatches();
  }

  fetchMatches() {
    this.isLoading = true; // Inizia il caricamento
    this.statsService.getMatchHistory(this.name, this.tag).subscribe({
      next: (response) => {
        this.allMatches = response.data || [];
        this.loadMatchesData();
        this.isLoading = false; // Caricamento completato
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  loadMatchesData() {
    if (this.allMatches.length === 0) return;

    // Filtriamo le vittorie
    const wins = this.allMatches.filter(m => {
      // Logica specifica per HenrikDev V3: 
      // dobbiamo trovare il team in cui si trova l'utente e vedere se ha vinto
      const myPlayer = m.players.all_players.find((p: any) =>
        p.name.toLowerCase() === this.name.toLowerCase()
      );
      const myTeam = myPlayer?.team.toLowerCase(); // 'blue' o 'red'
      return m.teams[myTeam]?.has_won === true;
    }).length;

    this.winRate = Math.round((wins / this.allMatches.length) * 100);
  }

  getAgentImage(agentName: string): string {
    const formattedName = agentName.toLowerCase().replace('/', '').replace(' ', '');
    return `assets/agents/${formattedName}.png`;
  }

  calculateHS(playerStats: any): number {
    // Nota: HenrikDev V3 ha le stats dentro l'oggetto player
    const headshots = playerStats.headshots || 0;
    const bodyshots = playerStats.bodyshots || 0;
    const legshots = playerStats.legshots || 0;
    const totalHits = headshots + bodyshots + legshots;
    return totalHits > 0 ? Math.round((headshots / totalHits) * 100) : 0;
  }

  getMyStats(match: any) {
    return match.players.all_players.find((p: any) =>
      p.name.toLowerCase() === this.name.toLowerCase()
    );
  }

  // Per sapere se hai vinto (utile per i colori)
  didIWin(match: any): boolean {
    const me = this.getMyStats(match);
    const myTeam = me?.team.toLowerCase(); // 'blue' o 'red'
    return match.teams[myTeam]?.has_won === true;
  }
}