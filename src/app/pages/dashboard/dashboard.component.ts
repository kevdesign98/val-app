import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthservicesService } from '../../service/authservices/authservices.service';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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

  // --- CONFIGURAZIONE GRAFICO RR ---
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Rank Rating',
        fill: true,
        tension: 0.4,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6366f1',
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#6366f1', font: { family: 'monospace' } }
      },
      x: { display: false }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111',
        titleFont: { family: 'monospace' },
        bodyFont: { family: 'monospace' }
      }
    }
  };

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

      // 2. Dati MMR (Rank attuale)
      this.stats.getMMR(this.name, this.tag).subscribe(res => {
        this.mmr = res;
      });

      // Carichiamo la storia MMR per il grafico
      this.loadRRHistory();

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
   * Recupera la cronologia MMR e popola il grafico 
   */
  // dashboard.component.ts

  loadRRHistory() {
    this.stats.getMMRHistory(this.name, this.tag).subscribe({
      next: (res: any) => {
        // Usiamo una variabile di supporto per pulizia
        const rawData = res?.data;

        // CONTROLLO CRITICO: Verifichiamo se è una lista PRIMA di usare i tre puntini
        if (rawData && Array.isArray(rawData)) {

          // Questa è la tua riga 119, ora protetta e sicura
          const history = [...rawData].reverse().slice(-15);

          this.lineChartData.labels = history.map((_, i) => `Match ${i + 1}`);
          this.lineChartData.datasets[0].data = history.map(m => m.ranking_in_tier || 0);

          setTimeout(() => this.chart?.update(), 200);
        } else {
          // Se arriviamo qui, l'API ha risposto ma non con una lista di match
          console.warn("⚠️ Attenzione: MMR History non è un array. Dati ricevuti:", res);

          // Opzionale: mostriamo un grafico vuoto invece di crashare
          this.lineChartData.labels = ['No Data'];
          this.lineChartData.datasets[0].data = [0];
          this.chart?.update();
        }
      },
      error: (err) => {
        console.error("❌ Errore nella chiamata MMR History:", err);
      }
    });
  }

  /**
   * Calcola K/D, Winrate e Headshot % in un unico ciclo
   */
  calculateLiveStats(matchData: any[]) {
    let totalKills = 0;
    let totalDeaths = 0;
    let totalShots = 0;
    let totalHeadshots = 0;
    let wins = 0;

    matchData.forEach(match => {
      const me = match.players.all_players.find((p: any) =>
        p.name.toLowerCase() === this.name.toLowerCase() &&
        p.tag.toLowerCase() === this.tag.toLowerCase()
      );

      if (me) {
        match.myStats = me; // Salviamo per l'HTML

        // Conteggi per K/D
        totalKills += me.stats.kills;
        totalDeaths += me.stats.deaths;

        // Conteggi per HS%
        const hs = me.stats.headshots || 0;
        const body = me.stats.bodyshots || 0;
        const legs = me.stats.legshots || 0;
        totalHeadshots += hs;
        totalShots += (hs + body + legs);

        // Calcolo Vittoria
        const myTeamColor = me.team.toLowerCase();
        if (match.teams[myTeamColor] && match.teams[myTeamColor].has_won) {
          wins++;
        }
      }
    });

    // Assegnazione medie
    this.avgKd = totalDeaths > 0 ? totalKills / totalDeaths : totalKills;
    this.avgHs = totalShots > 0 ? (totalHeadshots / totalShots) * 100 : 0;
    this.winRate = Math.round((wins / matchData.length) * 100);
  }

  logout() {
    this.auth.logout();
  }
}