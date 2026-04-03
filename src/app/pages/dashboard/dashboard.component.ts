import { Component, OnInit } from '@angular/core';
import { AuthservicesService } from '../../service/authservices/authservices.service';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  name: string = '';
  tag: string = '';
  account: any;
  mmr: any;
  lifetime: any;
  matches: any;

  // Variabili per le statistiche calcolate
  avgKd: number = 0;
  avgHs: number = 0;
  winRate: number = 0;

  constructor(
    private auth: AuthservicesService,
    private stats: StatsService,
    private router: Router
  ) { }

  ngOnInit() {
    const savedUser = localStorage.getItem('vlr_user');

    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.name = user.name;
      this.tag = user.tag;

      // 1. Dati Account
      this.stats.getAccount(this.name, this.tag).subscribe(res => {
        this.account = res;
      });

      // 2. Dati MMR (Rank)
      this.stats.getMMR(this.name, this.tag).subscribe(res => {
        this.mmr = res;
      });

      // 3. Match History e Calcolo Statistiche
      this.stats.getMatchHistory(this.name, this.tag).subscribe(res => {
        this.matches = res;
        if (this.matches && this.matches.data) {
          this.calculateLiveStats(this.matches.data);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Cicla sui match per estrarre le stats personali del giocatore loggato
   */
  calculateLiveStats(matchData: any[]) {
    let totalKills = 0;
    let totalDeaths = 0;
    let totalShots = 0;
    let totalHeadshots = 0;
    let wins = 0;

    matchData.forEach(match => {
      // Trovo me stesso nell'array dei giocatori del match
      const me = match.players.all_players.find((p: any) =>
        p.name.toLowerCase() === this.name.toLowerCase() &&
        p.tag.toLowerCase() === this.tag.toLowerCase()
      );

      if (me) {
        // Salviamo i dati personali direttamente nell'oggetto match per usarli facilmente nell'HTML
        match.myStats = me;

        // Conteggio Kills e Deaths per K/D
        totalKills += me.stats.kills;
        totalDeaths += me.stats.deaths;

        // Conteggio Headshots per HS%
        const hs = me.stats.headshots || 0;
        const body = me.stats.bodyshots || 0;
        const legs = me.stats.legshots || 0;
        totalHeadshots += hs;
        totalShots += (hs + body + legs);

        // Calcolo Vittoria (Controlliamo se il team di "me" ha vinto)
        const myTeamColor = me.team.toLowerCase(); // 'red' o 'blue'
        if (match.teams[myTeamColor] && match.teams[myTeamColor].has_won) {
          wins++;
        }
      }
    });

    // Assegnazione medie finali
    this.avgKd = totalDeaths > 0 ? totalKills / totalDeaths : totalKills;
    this.avgHs = totalShots > 0 ? (totalHeadshots / totalShots) * 100 : 0;
    this.winRate = Math.round((wins / matchData.length) * 100);
  }

  logout() {
    this.auth.logout();
  }
}