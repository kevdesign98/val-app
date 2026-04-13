import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, BaseChartDirective, SidebarModule],
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

  // Statistiche Avanzate
  avgKd: number = 0;
  avgHs: number = 0;
  winRate: number = 0;
  bestMap: any = { name: 'N/A', rate: 0 };
  worstMap: any = { name: 'N/A', rate: 0 };

  // Analisi Deep
  weaponAnalysis: any[] = [];
  serverAnalysis: any[] = [];
  hourlyStats: any[] = []; // Per grafico K/D per ora
  roleStats: { [key: string]: number } = {};
  topAgent: string = 'N/A';

  currentReport: any = null;
  aiAnalysis: any = null;
  loadingAI: boolean = false;
  coachSidebar: boolean = false;

  constructor(private stats: StatsService, private router: Router) { }

  ngOnInit() {
    const savedUser = localStorage.getItem('vlr_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.name = user.name;
      this.tag = user.tag;

      this.stats.getAccount(this.name, this.tag).subscribe(res => this.account = res);
      this.stats.getMMR(this.name, this.tag).subscribe(res => this.mmr = res);

      this.stats.getMatchHistory(this.name, this.tag).subscribe(res => {
        this.matches = res;
        if (this.matches?.data) {
          this.calculateProfessionalStats(this.matches.data);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  calculateProfessionalStats(matchData: any[]) {
    let tk = 0, td = 0, ts = 0, th = 0, wins = 0;
    const maps: any = {}, roles: any = {}, hours: any = {}, agents: any = {}, srvs: any = {}, wpns: any = {};

    matchData.forEach(match => {
      const me = match.players.all_players.find((p: any) =>
        p.name.toLowerCase() === this.name.toLowerCase()
      );

      if (me) {
        const isWin = match.teams[me.team.toLowerCase()]?.has_won;
        if (isWin) wins++;

        // Base Performance
        tk += me.stats.kills; td += me.stats.deaths;
        th += (me.stats.headshots || 0);
        ts += ((me.stats.headshots || 0) + (me.stats.bodyshots || 0) + (me.stats.legshots || 0));

        // Maps & Servers
        const mName = match.metadata.map;
        const sName = match.metadata.cluster;
        if (!maps[mName]) maps[mName] = { w: 0, t: 0 };
        if (!srvs[sName]) srvs[sName] = { w: 0, t: 0 };
        maps[mName].t++; srvs[sName].t++;
        if (isWin) { maps[mName].w++; srvs[sName].w++; }

        // Agents & Roles
        const agent = me.character;
        agents[agent] = (agents[agent] || 0) + 1;
        const role = this.getRole(agent);
        roles[role] = (roles[role] || 0) + 1;

        // Hourly Matrix
        const hour = new Date(match.metadata.game_start_patched).getHours();
        if (!hours[hour]) hours[hour] = { k: 0, d: 0, w: 0, t: 0 };
        hours[hour].k += me.stats.kills; hours[hour].d += me.stats.deaths;
        hours[hour].t++; if (isWin) hours[hour].w++;
      }
    });

    // Finalize Stats
    this.avgKd = td > 0 ? tk / td : tk;
    this.avgHs = ts > 0 ? (th / ts) * 100 : 0;
    this.winRate = Math.round((wins / matchData.length) * 100);
    this.roleStats = roles;
    this.topAgent = Object.keys(agents).reduce((a, b) => agents[a] > agents[b] ? a : b, 'N/A');

    // Mappatura Server & Orari
    this.serverAnalysis = Object.keys(srvs).map(k => ({ name: k, wr: Math.round((srvs[k].w / srvs[k].t) * 100) }));
    this.hourlyStats = Array.from({ length: 24 }, (_, i) => ({
      h: i,
      val: hours[i] ? (hours[i].k / (hours[i].d || 1)) : 0
    }));

    const sortedMaps = Object.keys(maps).map(k => ({ name: k, rate: Math.round((maps[k].w / maps[k].t) * 100) })).sort((a, b) => b.rate - a.rate);
    this.bestMap = sortedMaps[0] || { name: 'N/A', rate: 0 };
    this.worstMap = sortedMaps[sortedMaps.length - 1] || { name: 'N/A', rate: 0 };

    // Creazione Super Report per AI
    this.currentReport = {
      kd: this.avgKd.toFixed(2),
      hs: this.avgHs.toFixed(1),
      winrate: this.winRate,
      top_agent: this.topAgent,
      best_map: this.bestMap.name,
      worst_map: this.worstMap.name,
      server: this.serverAnalysis[0]?.name,
      hourly_peak: this.hourlyStats.sort((a, b) => b.val - a.val)[0]?.h + ":00"
    };
  }

  getRole(agent: string): string {
    const roles: any = {
      'Jett': 'Duelist', 'Reyna': 'Duelist', 'Raze': 'Duelist', 'Phoenix': 'Duelist', 'Neon': 'Duelist', 'Yoru': 'Duelist', 'Iso': 'Duelist',
      'Sage': 'Sentinel', 'Cypher': 'Sentinel', 'Killjoy': 'Sentinel', 'Chamber': 'Sentinel', 'Deadlock': 'Sentinel',
      'Sova': 'Initiator', 'Breach': 'Initiator', 'Skye': 'Initiator', 'KAY/O': 'Initiator', 'Fade': 'Initiator', 'Gekko': 'Initiator',
      'Brimstone': 'Controller', 'Omen': 'Controller', 'Viper': 'Controller', 'Astra': 'Controller', 'Harbor': 'Controller', 'Clove': 'Controller'
    };
    return roles[agent] || 'Unknown';
  }

  // dashboard.component.ts
  generateAIReport(data: any) {
    if (!data) {
      console.error("Dati mancanti per il report");
      return;
    }
    this.loadingAI = true;
    this.aiAnalysis = null;

    this.stats.getAiCoachAnalysis(data).subscribe({
      next: (res: any) => {
        this.aiAnalysis = res;
        this.loadingAI = false;
      },
      error: (err) => {
        console.error("Errore ricevuto:", err);
        this.aiAnalysis = { summary: "Servizio momentaneamente lento.", tip: "Riprova tra 10 secondi." };
        this.loadingAI = false;
      }
    });
  }

  asNumber(v: any): number { return Number(v) || 0; }
}