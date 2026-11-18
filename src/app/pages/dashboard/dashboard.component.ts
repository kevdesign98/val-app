import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DrawerModule } from 'primeng/drawer';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { SeoService } from '../../service/seo-services/seo.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FooterComponent, BaseChartDirective, DrawerModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  name: string = '';
  tag: string = '';
  account: any;
  mmr: any;

  // Stats Principali
  avgKd: number = 0;
  avgHs: number = 0;
  winRate: number = 0;
  bestMap: any = { name: 'N/A', rate: 0 };
  worstMap: any = { name: 'N/A', rate: 0 };
  topAgent: string = 'N/A';
  topAgentImage: string = '';

  // Analisi Avanzate
  weaponAnalysis: any[] = [];
  frequentTeammates: any[] = [];
  topRole: string = 'N/A';

  // UI & AI
  currentReport: any = null;
  aiAnalysis: any = null;
  loadingAI: boolean = false;
  lastMatchStats: any = null;
  userRank: any;
  showUserMenu: boolean = false;
  isMobileMenuOpen: boolean = false;

  // Filtri Modalità
  readonly MODES = ['Competitive', 'Unrated', 'Deathmatch', 'Team Deathmatch', 'Spike Rush', 'Premier', 'Swiftplay'];
  currentMode: string = 'Competitive';
  allMatches: any[] = [];

  // Chart Logic
  public mapChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public mapChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666', callback: (v) => v + '%' } },
      y: { grid: { display: false }, ticks: { color: '#fff', font: { weight: 'bold', size: 11 } } }
    },
    plugins: { legend: { display: false } }
  };

  constructor(private stats: StatsService, private router: Router, private eRef: ElementRef, private seo: SeoService) { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) this.showUserMenu = false;
  }

  ngOnInit() {
    const savedUser = localStorage.getItem('vlr_user');
    if (!savedUser) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(savedUser);
    this.name = user.name;
    this.tag = user.tag;

    // 1. INTERCETTAZIONE BYPASS PER ACCOUNT AMMINISTRATORE LOCALE
    if (user.isLocalAdmin) {
      this.loadMockDashboardData();
      return; // Interrompe l'esecuzione evitando le chiamate HTTP vere
    }

    // 2. CARICAMENTO DATI PROFILO IN PRODUZIONE (ONLINE)
    this.stats.getAccount(this.name, this.tag).subscribe(res => this.account = res);
    this.stats.getMMR(this.name, this.tag).subscribe((res: any) => {
      if (res?.data?.currenttier) {
        this.stats.getRankTiers().subscribe((tiersRes: any) => {
          const lastEpisode = tiersRes.data[tiersRes.data.length - 1];
          const found = lastEpisode.tiers.find((t: any) => t.tier === res.data.currenttier);
          if (found) this.userRank = { icon: found.largeIcon, name: found.tierName };
        });
      }

      this.seo.generateTags({
        title: 'La tua Dashboard Analitica',
        description: 'Scopri il tuo livello di Tilt, l\'efficacia delle tue utility e i consigli dell\'AI su ValApp.',
        image: 'https://valapp.it/assets/dashboard-preview.png'
      });
    });

    // Inizializzazione predefinita online
    this.selectMode('All Matches');
  }

  /**
   * Genera e popola la dashboard istantaneamente con dati simulati
   */
  private loadMockDashboardData() {
    this.loadingAI = false;

    // Profilo e Rank Mock
    this.account = { data: { name: this.name, tag: this.tag } };
    this.userRank = {
      icon: 'https://media.valorantapi.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/16/largeicon.png', // Platino 2 o simile
      name: 'Platinum 2'
    };

    // Stats Principali Mock
    this.avgKd = 1.15;
    this.avgHs = 22.4;
    this.winRate = 55;
    this.topAgent = 'Omen';
    this.topAgentImage = 'assets/agents/Omen.png';
    this.topRole = 'Controller';

    // Last Match Stats Mock
    this.lastMatchStats = {
      map: 'Ascent',
      mode: 'Competitive',
      result: 'VICTORY',
      score: '13 - 9',
      kills: 21,
      deaths: 15,
      kd: '1.40',
      hs: '24.5',
      agentImage: 'https://media.valorantapi.com/agents/388613ee-46a2-bc40-9074-14b143465ae1/displayicon.png'
    };

    // Analisi Armi Mock
    this.weaponAnalysis = [
      { name: 'Vandal', usage: 65, headshot: '24.5' },
      { name: 'Phantom', usage: 20, headshot: '21.0' },
      { name: 'Sheriff', usage: 15, headshot: '35.2' }
    ];

    // Teammates Mock
    this.frequentTeammates = [
      { name: 'Valeria', tag: 'VLR', matches: 8, kd: '1.08', winRate: 63 },
      { name: 'RadiantPlayer', tag: 'EUW', matches: 4, kd: '1.32', winRate: 50 }
    ];

    // Report Strutturato per il Coach AI locale
    this.currentReport = {
      kd: '1.15',
      hs: '22.4',
      winrate: 55,
      total_kills: 142,
      total_matches: 10,
      top_agent: 'Omen',
      top_role: 'Controller'
    };

    // Grafico delle Mappe Mock
    this.mapChartData = {
      labels: ['Ascent', 'Bind', 'Haven', 'Split'],
      datasets: [{
        data: [70, 60, 45, 40],
        backgroundColor: '#6366f1',
        borderRadius: 4,
        barThickness: 12
      }]
    };

    if (this.chart) setTimeout(() => this.chart?.update(), 100);
  }

  /**
   * Gestisce il cambio modalità dai pulsanti UI
   */
  selectMode(mode: string) {
    // Se siamo in modalità Admin locale, congeliamo il cambio di modalità evitando chiamate API fallimentari
    const savedUser = localStorage.getItem('vlr_user');
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (user?.isLocalAdmin) {
      this.currentMode = mode;
      return;
    }

    this.currentMode = mode;
    this.aiAnalysis = null;
    this.loadingAI = true;

    const apiQueryMode = (mode === 'All Matches') ? '' : mode;

    this.stats.getMatchHistory(this.name, this.tag, apiQueryMode).subscribe({
      next: (res: any) => {
        console.log("Risposta API Henrik:", res);
        this.allMatches = res.data || [];

        const filtered = this.allMatches.filter(m => {
          const apiMode = (m.metadata?.mode || '').toLowerCase().trim();
          const selected = (mode || '').toLowerCase().trim();

          if (selected === 'all matches') return true;
          if (!apiMode) return false;

          if (selected === 'team deathmatch') return apiMode.includes('team');
          if (selected === 'deathmatch') return apiMode === 'deathmatch' && !apiMode.includes('team');

          return apiMode.includes(selected.replace(/\s+/g, ''));
        });

        if (filtered.length > 0) {
          this.calculateProfessionalStats(filtered);
        } else {
          this.resetStats();
        }
        this.loadingAI = false;
      },
      error: (err) => {
        console.error("Errore recupero match:", err);
        this.resetStats();
        this.loadingAI = false;
      }
    });
  }

  calculateProfessionalStats(matchData: any[]) {
    let tk = 0, td = 0, ts = 0, th = 0, wins = 0;
    const maps: any = {}, roles: any = {}, agents: any = {};
    const wpns: { [key: string]: any } = {};
    const mates: { [key: string]: any } = {};

    // 1. Last Match Info
    const lastMatch = matchData[0];
    const meLast = lastMatch.players?.all_players?.find((p: any) => p.name.toLowerCase() === this.name.toLowerCase());

    if (meLast) {
      const myTeam = meLast.team.toLowerCase();
      const opponentTeam = myTeam === 'red' ? 'blue' : 'red';
      this.lastMatchStats = {
        map: lastMatch.metadata.map,
        mode: lastMatch.metadata.mode,
        result: lastMatch.teams[myTeam]?.has_won ? 'VICTORY' : 'DEFEAT',
        score: `${lastMatch.teams[myTeam]?.rounds_won || 0} - ${lastMatch.teams[opponentTeam]?.rounds_won || 0}`,
        kills: meLast.stats.kills,
        deaths: meLast.stats.deaths,
        kd: (meLast.stats.kills / (meLast.stats.deaths || 1)).toFixed(2),
        hs: (((meLast.stats.headshots || 0) / ((meLast.stats.headshots + meLast.stats.bodyshots + meLast.stats.legshots) || 1)) * 100).toFixed(1),
        agentImage: meLast.assets?.agent?.small || ''
      };
    }

    // 2. Aggregazione Dati
    matchData.forEach(match => {
      const me = match.players?.all_players?.find((p: any) =>
        p.name.toLowerCase().trim() === this.name.toLowerCase().trim()
      );
      if (!me) return;

      const isWin = match.teams[me.team.toLowerCase()]?.has_won;
      if (isWin) wins++;

      tk += me.stats.kills; td += me.stats.deaths;
      th += (me.stats.headshots || 0);
      ts += (me.stats.headshots + me.stats.bodyshots + me.stats.legshots) || 0;

      // Logica Armi
      if (match.kills) {
        match.kills.forEach((k: any) => {
          if (k.killer_display_name.toLowerCase() === `${this.name}#${this.tag}`.toLowerCase()) {
            const wName = k.damage_weapon_name || 'Unknown';
            if (!wpns[wName]) wpns[wName] = { kills: 0, hs: 0, shots: 0 };
            wpns[wName].kills += 1;
          }
        });
      }

      // Logica Teammates
      match.players.all_players
        .filter((p: any) => p.team === me.team && p.name.toLowerCase() !== this.name.toLowerCase())
        .forEach((mate: any) => {
          const mKey = `${mate.name}#${mate.tag}`;
          if (!mates[mKey]) mates[mKey] = { name: mate.name, tag: mate.tag, wins: 0, total: 0, kills: 0, deaths: 0 };
          mates[mKey].total++;
          if (isWin) mates[mKey].wins++;
          mates[mKey].kills += mate.stats.kills;
          mates[mKey].deaths += mate.stats.deaths;
        });

      const mName = match.metadata.map;
      maps[mName] = maps[mName] || { w: 0, t: 0 };
      maps[mName].t++; if (isWin) maps[mName].w++;

      const agent = me.character;
      agents[agent] = (agents[agent] || 0) + 1;
      const role = this.getRole(agent);
      roles[role] = (roles[role] || 0) + 1;
    });

    // 3. Finalizzazione Stats
    this.avgKd = td > 0 ? tk / td : tk;
    this.avgHs = ts > 0 ? (th / ts) * 100 : 0;
    this.winRate = Math.round((wins / matchData.length) * 100);
    this.topAgent = Object.keys(agents).reduce((a, b) => agents[a] > agents[b] ? a : b, 'N/A');
    this.topRole = Object.keys(roles).reduce((a, b) => roles[a] > roles[b] ? a : b, 'Unknown');

    if (this.topAgent !== 'N/A') {
      let clean = this.topAgent.replace(/[^a-zA-Z0-9]/g, '');
      const formattedName = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
      this.topAgentImage = `assets/agents/${formattedName}.png`;
    } else {
      this.topAgentImage = '';
    }

    // 4. Report per AI
    this.currentReport = {
      kd: this.avgKd.toFixed(2),
      hs: this.avgHs.toFixed(1),
      winrate: this.winRate,
      total_kills: tk,
      total_matches: matchData.length,
      top_agent: this.topAgent,
      top_role: this.topRole
    };

    // 5. Weapon Analysis
    this.weaponAnalysis = Object.keys(wpns).map(k => ({
      name: k,
      usage: Math.round((wpns[k].kills / (tk || 1)) * 100),
      headshot: wpns[k].shots > 0 ? ((wpns[k].hs / wpns[k].shots) * 100).toFixed(1) : '0.0'
    })).sort((a, b) => b.usage - a.usage).slice(0, 3);

    // 6. Mapping Teammates
    this.frequentTeammates = Object.values(mates)
      .map((m: any) => ({
        name: m.name, tag: m.tag, matches: m.total,
        kd: (m.kills / (m.deaths || 1)).toFixed(2),
        winRate: Math.round((m.wins / m.total) * 100)
      }))
      .sort((a, b) => b.matches - a.matches).slice(0, 5);

    // Update Chart
    const sortedMaps = Object.keys(maps).map(k => ({ name: k, rate: Math.round((maps[k].w / maps[k].t) * 100) })).sort((a, b) => b.rate - a.rate);
    this.mapChartData = {
      labels: sortedMaps.map(m => m.name),
      datasets: [{ data: sortedMaps.map(m => m.rate), backgroundColor: '#6366f1', borderRadius: 4, barThickness: 12 }]
    };
    if (this.chart) this.chart.update();
  }

  startManualAnalysis() {
    if (this.currentReport && !this.loadingAI) {
      this.loadingAI = true;
      this.aiAnalysis = null;
      this.stats.getAiCoachAnalysis(this.currentReport).subscribe({
        next: (res: any) => {
          this.aiAnalysis = res;
          this.loadingAI = false;
        },
        error: () => {
          this.aiAnalysis = { summary: "Errore nell'analisi.", tip: "Riprova tra poco." };
          this.loadingAI = false;
        }
      });
    }
  }

  private resetStats() {
    this.avgKd = 0; this.avgHs = 0; this.winRate = 0;
    this.weaponAnalysis = []; this.frequentTeammates = [];
    this.lastMatchStats = null; this.currentReport = null;
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

  asNumber(v: any): number { return Number(v) || 0; }
  logout() { localStorage.removeItem('vlr_user'); this.router.navigate(['/Home']); }
}