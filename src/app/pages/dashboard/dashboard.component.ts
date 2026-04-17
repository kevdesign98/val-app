import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FooterComponent, BaseChartDirective, SidebarModule, RouterLink],
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

  avgKd: number = 0;
  avgHs: number = 0;
  winRate: number = 0;
  bestMap: any = { name: 'N/A', rate: 0 };
  worstMap: any = { name: 'N/A', rate: 0 };

  weaponAnalysis: any[] = [];
  frequentSquad: any[] = [];
  serverAnalysis: any[] = [];
  hourlyStats: any[] = [];
  roleStats: { [key: string]: number } = {};
  topAgent: string = 'N/A';

  currentReport: any = null;
  aiAnalysis: any = null;
  loadingAI: boolean = false;
  coachSidebar: boolean = false;
  playerRankData: any;
  lastMatchStats: any = null;

  public mapChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public mapChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#666', callback: (v) => v + '%' }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#fff', font: { weight: 'bold', size: 11 } }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#101216',
        titleColor: '#6366f1',
        bodyColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
      }
    }
  };

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
    if (!matchData || matchData.length === 0) return;

    // 1. FILTRIAMO SOLO I MATCH COMPETITIVE
    const competitiveMatches = matchData.filter(m =>
      m.metadata.mode === 'Competitive' || m.metadata.mode === 'competitive'
    );

    // Se ci sono match competitivi usiamo quelli, altrimenti fallback su tutto il matchData
    const finalData = competitiveMatches.length > 0 ? competitiveMatches : matchData;

    // 2. LOGICA LAST MATCH REPORT (Prendiamo il primo dall'array filtrato)
    const lastMatch = finalData[0];
    const meLast = lastMatch.players.all_players.find((p: any) =>
      p.name.toLowerCase() === this.name.toLowerCase()
    );

    if (meLast) {
      const myTeam = meLast.team.toLowerCase();
      const opponentTeam = myTeam === 'red' ? 'blue' : 'red';

      this.lastMatchStats = {
        map: lastMatch.metadata.map,
        mode: lastMatch.metadata.mode,
        result: lastMatch.teams[myTeam].has_won ? 'VICTORY' : 'DEFEAT',
        score: `${lastMatch.teams[myTeam].rounds_won} - ${lastMatch.teams[opponentTeam]?.rounds_won || 0}`,
        kills: meLast.stats.kills,
        deaths: meLast.stats.deaths,
        assists: meLast.stats.assists,
        kd: (meLast.stats.kills / (meLast.stats.deaths || 1)).toFixed(2),
        hs: (((meLast.stats.headshots || 0) / ((meLast.stats.headshots + meLast.stats.bodyshots + meLast.stats.legshots) || 1)) * 100).toFixed(1),
        agent: meLast.character,
        agentImage: meLast.assets?.agent?.small || 'assets/default-agent.png'
      };
    }

    // 3. INIZIALIZZAZIONE VARIABILI STATS GENERALI
    let tk = 0, td = 0, ts = 0, th = 0, wins = 0;
    const maps: any = {}, roles: any = {}, hours: any = {}, agents: any = {}, srvs: any = {};
    const wpns: { [key: string]: any } = {};
    const mates: { [key: string]: any } = {};

    // 4. CALCOLO STATS SU FINAL DATA (SOLO COMPETITIVE)
    finalData.forEach(match => {
      const me = match.players.all_players.find((p: any) =>
        p.name.toLowerCase() === this.name.toLowerCase()
      );

      if (me) {
        const myTeamKey = me.team.toLowerCase();
        const isWin = match.teams[myTeamKey]?.has_won;
        if (isWin) wins++;

        tk += me.stats.kills;
        td += me.stats.deaths;
        th += (me.stats.headshots || 0);
        ts += (me.stats.headshots || 0) + (me.stats.bodyshots || 0) + (me.stats.legshots || 0);

        // Analisi Armi (Weapon Analysis)
        if (match.kills) {
          match.kills.forEach((kill: any) => {
            if (kill.killer_display_name.toLowerCase().startsWith(this.name.toLowerCase())) {
              const weaponUsed = kill.damage_weapon_name || 'Unknown';
              if (!wpns[weaponUsed]) wpns[weaponUsed] = { kills: 0, hs: 0, shots: 0 };
              wpns[weaponUsed].kills++;
            }
          });
        }

        // Analisi Compagni di Squadra (Frequent Squad)
        const myTeamPlayers = match.players.all_players.filter((p: any) =>
          p.team === me.team && p.name.toLowerCase() !== this.name.toLowerCase()
        );

        myTeamPlayers.forEach((mate: any) => {
          if (!mates[mate.name]) {
            mates[mate.name] = { character: mate.character, wins: 0, total: 0, kills: 0, deaths: 0, hs: 0, shots: 0 };
          }
          mates[mate.name].total++;
          if (isWin) mates[mate.name].wins++;
          mates[mate.name].kills += mate.stats.kills;
          mates[mate.name].deaths += mate.stats.deaths;
          mates[mate.name].hs += (mate.stats.headshots || 0);
          mates[mate.name].shots += (mate.stats.headshots + mate.stats.bodyshots + mate.stats.legshots) || 0;
        });

        // Mappe, Agenti e Ruoli
        const mName = match.metadata.map;
        if (!maps[mName]) maps[mName] = { w: 0, t: 0 };
        maps[mName].t++; if (isWin) maps[mName].w++;

        const agent = me.character;
        agents[agent] = (agents[agent] || 0) + 1;
        const role = this.getRole(agent);
        roles[role] = (roles[role] || 0) + 1;

        // Stats Orarie
        const hour = new Date(match.metadata.game_start_patched).getHours();
        if (!hours[hour]) hours[hour] = { k: 0, d: 0, w: 0, t: 0 };
        hours[hour].k += me.stats.kills;
        hours[hour].d += me.stats.deaths;
        hours[hour].t++;
        if (isWin) hours[hour].w++;
      }
    });

    // 5. ASSEGNAZIONE VALORI ALLA DASHBOARD
    this.avgKd = td > 0 ? tk / td : tk;
    this.avgHs = ts > 0 ? (th / ts) * 100 : 0;
    this.winRate = Math.round((wins / finalData.length) * 100);
    this.roleStats = roles;
    this.topAgent = Object.keys(agents).reduce((a, b) => agents[a] > agents[b] ? a : b, 'N/A');

    // Ordinamento Mappe e Grafico
    const sortedMaps = Object.keys(maps).map(k => ({
      name: k,
      rate: Math.round((maps[k].w / maps[k].t) * 100)
    })).sort((a, b) => b.rate - a.rate);

    if (sortedMaps.length > 0) {
      this.bestMap = sortedMaps[0];
      this.worstMap = sortedMaps[sortedMaps.length - 1];

      this.mapChartData = {
        labels: sortedMaps.map(m => m.name),
        datasets: [{
          data: sortedMaps.map(m => m.rate),
          backgroundColor: '#6366f1',
          borderRadius: 4,
          barThickness: 12
        }]
      };
    }

    // Finalizzazione Compagni
    this.frequentSquad = Object.keys(mates).map(k => {
      const m = mates[k];
      return {
        name: k,
        role: this.getRole(m.character),
        winRate: Math.round((m.wins / m.total) * 100),
        matches: m.total,
        kd: (m.kills / (m.deaths || 1)).toFixed(2),
        hs: (m.shots > 0 ? (m.hs / m.shots * 100) : 0).toFixed(1),
        initial: k.charAt(0).toUpperCase()
      };
    }).sort((a, b) => b.matches - a.matches).slice(0, 3);

    // Report finale per AI e UI
    this.currentReport = {
      kd: this.avgKd.toFixed(2),
      hs: this.avgHs.toFixed(1),
      winrate: this.winRate,
      top_agent: this.topAgent,
      best_map: this.bestMap.name,
      worst_map: this.worstMap.name,
      hourly_peak: Object.keys(hours).length > 0 ? Object.keys(hours).sort((a, b) => hours[b].k - hours[a].k)[0] + ":00" : "N/A"
    };

    if (this.chart) this.chart.update();
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

  generateAIReport(data: any) {
    if (!data) return;
    this.loadingAI = true;
    this.aiAnalysis = null;
    this.stats.getAiCoachAnalysis(data).subscribe({
      next: (res: any) => {
        this.aiAnalysis = res;
        this.loadingAI = false;
      },
      error: () => {
        this.aiAnalysis = { summary: "Servizio momentaneamente lento.", tip: "Riprova tra 10 secondi." };
        this.loadingAI = false;
      }
    });
  }

  asNumber(v: any): number { return Number(v) || 0; }
}

