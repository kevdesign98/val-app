import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthservicesService } from '../../service/authservices/authservices.service';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, BaseChartDirective, SidebarModule, DialogModule, TooltipModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  name: string = '';
  tag: string = '';
  account: any;
  mmr: any;
  matches: any;

  // Statistiche calcolate
  avgKd: number = 0;
  avgHs: number = 0;
  winRate: number = 0;

  // Nuove stats per Valapp Elite
  bestMap: { name: string, rate: number } = { name: 'N/A', rate: 0 };
  worstMap: { name: string, rate: number } = { name: 'N/A', rate: 0 };
  topAgent: string = '';
  // Sostituisci roleStats: any = {}; con:
  roleStats: { [key: string]: number } = {};
  bestHour: string = 'N/A';

  // Variabili UI
  aiAnalysis: any = null;
  coachSidebar: boolean = false;
  statsDialog: boolean = false;
  matchDialog: boolean = false;
  selectedMatch: any = null;


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Rank Rating',
      fill: true,
      tension: 0.4,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#fff'
    }]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#6366f1' } },
      x: { display: false }
    },
    plugins: { legend: { display: false } }
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

      this.stats.getAccount(this.name, this.tag).subscribe(res => this.account = res);
      this.stats.getMMR(this.name, this.tag).subscribe(res => this.mmr = res);
      this.loadRRHistory();

      this.stats.getMatchHistory(this.name, this.tag).subscribe(res => {
        this.matches = res;
        if (this.matches?.data) {
          this.calculateLiveStats(this.matches.data);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadRRHistory() {
    this.stats.getMMRHistory(this.name, this.tag).subscribe({
      next: (res: any) => {
        const rawData = res?.data;
        if (rawData && Array.isArray(rawData)) {
          const history = [...rawData].reverse().slice(-15);
          this.lineChartData.labels = history.map((_, i) => `Match ${i + 1}`);
          this.lineChartData.datasets[0].data = history.map(m => m.ranking_in_tier || 0);
          setTimeout(() => this.chart?.update(), 200);
        }
      }
    });
  }

  calculateLiveStats(matchData: any[]) {
    let totalKills = 0, totalDeaths = 0, totalShots = 0, totalHeadshots = 0, wins = 0;
    const mapStats: any = {}, roles: any = {}, hours: any = {}, agents: any = {};

    matchData.forEach(match => {
      const me = match.players.all_players.find((p: any) =>
        p.name.toLowerCase() === this.name.toLowerCase() && p.tag.toLowerCase() === this.tag.toLowerCase()
      );

      if (me) {
        match.myStats = me;
        totalKills += me.stats.kills;
        totalDeaths += me.stats.deaths;
        totalHeadshots += (me.stats.headshots || 0);
        totalShots += ((me.stats.headshots || 0) + (me.stats.bodyshots || 0) + (me.stats.legshots || 0));

        const isWin = match.teams[me.team.toLowerCase()]?.has_won;
        if (isWin) wins++;

        // Maps
        const mapName = match.metadata.map;
        if (!mapStats[mapName]) mapStats[mapName] = { wins: 0, total: 0 };
        mapStats[mapName].total++;
        if (isWin) mapStats[mapName].wins++;

        // Roles & Agents
        const agentName = me.character;
        agents[agentName] = (agents[agentName] || 0) + 1;
        const role = this.getRoleFromAgent(agentName);
        roles[role] = (roles[role] || 0) + 1;

        // Hours
        const hour = new Date(match.metadata.game_start_patched).getHours();
        if (!hours[hour]) hours[hour] = { wins: 0, total: 0 };
        hours[hour].total++;
        if (isWin) hours[hour].wins++;
      }
    });

    this.avgKd = totalDeaths > 0 ? totalKills / totalDeaths : totalKills;
    this.avgHs = totalShots > 0 ? (totalHeadshots / totalShots) * 100 : 0;
    this.winRate = Math.round((wins / matchData.length) * 100);
    this.roleStats = roles;
    this.topAgent = Object.keys(agents).reduce((a, b) => agents[a] > agents[b] ? a : b, 'N/A');
    this.bestHour = this.findBestHour(hours);

    const sortedMaps = Object.keys(mapStats).map(name => ({
      name,
      rate: Math.round((mapStats[name].wins / mapStats[name].total) * 100)
    })).sort((a, b) => b.rate - a.rate);

    if (sortedMaps.length > 0) {
      this.bestMap = sortedMaps[0];
      this.worstMap = sortedMaps[sortedMaps.length - 1];
    }

    // Report per AI
    const superReport = {
      kd: this.avgKd.toFixed(2),
      hs: this.avgHs.toFixed(1),
      winrate: this.winRate,
      best_map: this.bestMap,
      worst_map: this.worstMap,
      roles: this.roleStats,
      top_agent: this.topAgent,
      best_hours: this.bestHour,
      server: matchData[0]?.metadata?.cluster || 'EU'
    };

    this.generateAIReport(superReport);
  }

  getRoleFromAgent(agent: string): string {
    const r: any = {
      'Jett': 'Duelist', 'Reyna': 'Duelist', 'Raze': 'Duelist', 'Phoenix': 'Duelist', 'Neon': 'Duelist', 'Yoru': 'Duelist', 'Iso': 'Duelist',
      'Sage': 'Sentinel', 'Cypher': 'Sentinel', 'Killjoy': 'Sentinel', 'Chamber': 'Sentinel', 'Deadlock': 'Sentinel',
      'Sova': 'Initiator', 'Breach': 'Initiator', 'Skye': 'Initiator', 'KAY/O': 'Initiator', 'Fade': 'Initiator', 'Gekko': 'Initiator',
      'Brimstone': 'Controller', 'Omen': 'Controller', 'Viper': 'Controller', 'Astra': 'Controller', 'Harbor': 'Controller', 'Clove': 'Controller'
    };
    return r[agent] || 'Unknown';
  }

  findBestHour(hours: any): string {
    let bestH = 0, maxWr = -1;
    Object.keys(hours).forEach(h => {
      const wr = hours[h].wins / hours[h].total;
      if (wr > maxWr) { maxWr = wr; bestH = +h; }
    });
    return `${bestH}:00 - ${bestH + 1}:00`;
  }

  generateAIReport(reportData: any) {
    this.aiAnalysis = null;
    this.stats.getAiCoachAnalysis(reportData).subscribe({
      next: (res: any) => this.aiAnalysis = res,
      error: () => this.aiAnalysis = { summary: "Offline", tip: "REBOOT" }
    });
  }

  openMatchDetails(m: any) { this.selectedMatch = m; this.matchDialog = true; }


}