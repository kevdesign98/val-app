import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HostListener, ElementRef } from '@angular/core';
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
    userRank: any;
    allRanks: any[] = [];

    readonly MODES = ['Competitive', 'Unrated', 'Deathmatch', 'Team Deathmatch', 'Spike Rush', 'Premier'];
    currentMode: string = 'Competitive';
    allMatches: any[] = [];

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

    showUserMenu: boolean = false;

    logout() {
        localStorage.removeItem('vlr_user');
        this.router.navigate(['/Home']);
    }

    isMobileMenuOpen: boolean = false;

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
    constructor(private stats: StatsService, private router: Router, private eRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.showUserMenu = false;
        }
    }


    ngOnInit() {

        this.stats.getMatchHistory(this.name, this.tag).subscribe({
            next: (res) => {
                this.matches = res;
                if (this.matches?.data) {
                    this.userRank = res.data;
                    this.allMatches = this.matches.data;
                    this.setMode(this.currentMode);
                } else {
                    this.resetStats();
                }
            },
            error: (err) => {
                console.error("Errore MMR:", err)
                this.resetStats();
            }
        });

        const savedUser = localStorage.getItem('vlr_user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            this.name = user.name;
            this.tag = user.tag;

            this.stats.getAccount(this.name, this.tag).subscribe(res => this.account = res);

            // MODIFICA QUI: Recupero MMR e mappatura immagine da Valorant-API
            this.stats.getMMR(this.name, this.tag).subscribe((res: any) => {
                this.mmr = res;
                if (res?.data?.currenttier) {
                    this.stats.getRankTiers().subscribe((tiersRes: any) => {
                        const lastEpisode = tiersRes.data[tiersRes.data.length - 1];
                        const found = lastEpisode.tiers.find((t: any) => t.tier === res.data.currenttier);
                        if (found) {
                            // Aggiorniamo userRank con l'icona corretta
                            this.userRank = { ...this.userRank, icon: found.largeIcon, name: found.tierName };
                        }
                    });
                }
            });

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

    setMode(mode: string) {
        this.currentMode = mode;

        if (this.allMatches && this.allMatches.length > 0) {
            // Filtriamo i match in base alla modalità (metadata.mode)
            // Nota: Valorant API di solito usa 'Competitive', 'Unrated', 'Deathmatch', ecc.
            const filteredMatches = this.allMatches.filter(match =>
                match.metadata.mode.toLowerCase() === mode.toLowerCase()
            );

            // Se ci sono match per questa modalità, calcoliamo le stats
            if (filteredMatches.length > 0) {
                this.calculateProfessionalStats(filteredMatches);
            } else {
                // Se non ci sono match, resettiamo le card per non mostrare dati vecchi
                this.resetStats();
            }
        }
    }




    calculateProfessionalStats(matchData: any[]) {

        if (!matchData || matchData.length === 0) return;

        // --- RIMOSSO IL FILTRO FISSO 'Competitive' ---
        // Usiamo direttamente matchData che è già stato filtrato dalla funzione setMode()
        const dataToUse = matchData;

        // Per il "Last Match" prendiamo semplicemente il primo dell'array (che è il più recente della modalità scelta)
        const lastMatch = dataToUse[0];

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
                score: `${lastMatch.teams[myTeam].rounds_won} - ${lastMatch.teams[opponentTeam].rounds_won}`,
                kills: meLast.stats.kills,
                deaths: meLast.stats.deaths,
                assists: meLast.stats.assists,
                kd: (meLast.stats.kills / (meLast.stats.deaths || 1)).toFixed(2),
                hs: (((meLast.stats.headshots || 0) / ((meLast.stats.headshots + meLast.stats.bodyshots + meLast.stats.legshots) || 1)) * 100).toFixed(1),
                agent: meLast.character,
                agentImage: meLast.assets?.agent?.small || 'assets/default-agent.png'
            };
        }

        // Da qui in poi il resto della tua logica (tk, td, ts, th...) va bene 
        // perché userà correttamente 'dataToUse' che ora contiene la modalità giusta.
        let tk = 0, td = 0, ts = 0, th = 0, wins = 0;
        const maps: any = {}, roles: any = {}, hours: any = {}, agents: any = {}, srvs: any = {};
        const wpns: { [key: string]: any } = {};
        const mates: { [key: string]: any } = {};

        dataToUse.forEach(match => {
            const me = match.players.all_players.find((p: any) =>
                p.name.toLowerCase() === this.name.toLowerCase()
            );

            if (me) {
                const isWin = match.teams[me.team.toLowerCase()]?.has_won;
                if (isWin) wins++;

                tk += me.stats.kills; td += me.stats.deaths;
                th += (me.stats.headshots || 0);
                const currentMatchShots = (me.stats.headshots || 0) + (me.stats.bodyshots || 0) + (me.stats.legshots || 0);
                ts += currentMatchShots;

                if (match.kills) {
                    match.kills.forEach((kill: any) => {
                        if (kill.killer_display_name.toLowerCase() === this.name.toLowerCase() + '#' + this.tag.toLowerCase()) {
                            const weaponUsed = kill.damage_weapon_name || 'Unknown';
                            if (!wpns[weaponUsed]) wpns[weaponUsed] = { kills: 0, hs: 0, shots: 0 };
                            wpns[weaponUsed].kills++;
                        }
                    });
                }

                if (Object.keys(wpns).length === 0 && me.damage_weapon) {
                    me.damage_weapon.forEach((w: any) => {
                        const name = w.weaponName || 'Vandal';
                        if (!wpns[name]) wpns[name] = { kills: 0, hs: 0, shots: 0 };
                        wpns[name].kills += w.kills || 0;
                        wpns[name].hs += w.headshots || 0;
                        wpns[name].shots += (w.headshots + w.bodyshots + w.legshots) || 0;
                    });
                }


                const myTeamPlayers = match.players.all_players.filter((p: any) => p.team === me.team && p.name !== me.name);
                myTeamPlayers.forEach((mate: any) => {
                    if (!mates[mate.name]) {
                        mates[mate.name] = {
                            character: mate.character,
                            wins: 0,
                            total: 0,
                            kills: 0,
                            deaths: 0,
                            hs: 0,
                            shots: 0
                        };
                    }
                    mates[mate.name].total++;
                    if (isWin) mates[mate.name].wins++;

                    mates[mate.name].kills += mate.stats.kills;
                    mates[mate.name].deaths += mate.stats.deaths;
                    mates[mate.name].hs += (mate.stats.headshots || 0);
                    mates[mate.name].shots += (mate.stats.headshots + mate.stats.bodyshots + mate.stats.legshots) || 0;
                });

                const mName = match.metadata.map;
                const sName = match.metadata.cluster;
                if (!maps[mName]) maps[mName] = { w: 0, t: 0 };
                if (!srvs[sName]) srvs[sName] = { w: 0, t: 0 };
                maps[mName].t++; srvs[sName].t++;
                if (isWin) { maps[mName].w++; srvs[sName].w++; }

                const agent = me.character;
                agents[agent] = (agents[agent] || 0) + 1;
                const role = this.getRole(agent);
                roles[role] = (roles[role] || 0) + 1;

                const hour = new Date(match.metadata.game_start_patched).getHours();
                if (!hours[hour]) hours[hour] = { k: 0, d: 0, w: 0, t: 0 };
                hours[hour].k += me.stats.kills; hours[hour].d += me.stats.deaths;
                hours[hour].t++; if (isWin) hours[hour].w++;
            }
        });

        this.avgKd = td > 0 ? tk / td : tk;
        this.avgHs = ts > 0 ? (th / ts) * 100 : 0;
        this.winRate = Math.round((wins / matchData.length) * 100);
        this.roleStats = roles;
        this.topAgent = Object.keys(agents).reduce((a, b) => agents[a] > agents[b] ? a : b, 'N/A');

        const wpnArray = Object.values(wpns) as any[];
        const totalKillsCount = wpnArray.reduce((acc: number, curr: any) => acc + (curr.kills || 0), 0);

        this.weaponAnalysis = Object.keys(wpns).map(k => ({
            name: k,
            usage: totalKillsCount > 0 ? Math.round((wpns[k].kills / totalKillsCount) * 100) : 0,
            headshot: wpns[k].shots > 0 ? ((wpns[k].hs / wpns[k].shots) * 100).toFixed(1) : this.avgHs.toFixed(1)
        })).sort((a, b) => b.usage - a.usage).slice(0, 3);

        this.frequentSquad = Object.keys(mates).map(k => {
            const m = mates[k];
            const kd = m.deaths > 0 ? (m.kills / m.deaths).toFixed(2) : m.kills.toFixed(2);
            const hs = m.shots > 0 ? ((m.hs / m.shots) * 100).toFixed(1) : '0.0';

            return {
                name: k,
                role: this.getRole(m.character),
                winRate: Math.round((m.wins / m.total) * 100),
                matches: m.total,
                kd: kd,
                hs: hs,
                initial: k.charAt(0).toUpperCase()
            };
        }).sort((a, b) => b.matches - a.matches).slice(0, 3);

        this.serverAnalysis = Object.keys(srvs).map(k => ({ name: k, wr: Math.round((srvs[k].w / srvs[k].t) * 100) }));
        this.hourlyStats = Array.from({ length: 24 }, (_, i) => ({
            h: i,
            val: hours[i] ? (hours[i].k / (hours[i].d || 1)) : 0
        }));

        const sortedMaps = Object.keys(maps).map(k => ({
            name: k,
            rate: Math.round((maps[k].w / maps[k].t) * 100)
        })).sort((a, b) => b.rate - a.rate);

        this.bestMap = sortedMaps[0] || { name: 'N/A', rate: 0 };
        this.worstMap = sortedMaps[sortedMaps.length - 1] || { name: 'N/A', rate: 0 };

        this.mapChartData = {
            labels: sortedMaps.map(m => m.name),
            datasets: [
                {
                    data: sortedMaps.map(m => m.rate),
                    backgroundColor: '#6366f1',
                    borderRadius: 4,
                    barThickness: 12
                }
            ]
        };

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

        if (this.chart) this.chart.update();
    }

    private resetStats() {
        this.lastMatchStats = null;
        this.avgKd = 0;
        this.avgHs = 0;
        this.winRate = 0;
        this.frequentSquad = [];
        this.weaponAnalysis = [];
        this.mapChartData = { labels: [], datasets: [] };
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

