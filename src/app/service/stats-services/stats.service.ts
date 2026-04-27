import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { url } from 'inspector';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private vlrApiKey = environment.apiKey;
  private url = "https://valorant-api.com/v1/agents";

  constructor(private http: HttpClient) { }

  private getVlrHeaders() {
    return new HttpHeaders({
      'Authorization': this.vlrApiKey,
      'Accept': 'application/json'
    });
  }

  // Chiamate a HenrikDev
  // stats.service.ts
  getMatchHistory(name: string, tag: string, mode?: string): Observable<any> {
    // Aggiungiamo il parametro filter per la modalità
    let url = `https://api.henrikdev.xyz/valorant/v3/matches/eu/${name}/${tag}?size=20`;

    if (mode) {
      // Se passiamo 'competitive', l'API cercherà solo le competitive
      url += `&filter=${mode.toLowerCase()}`;
    }

    return this.http.get<any>(url, { headers: this.getVlrHeaders() });
  }
  getAccount(name: string, tag: string) {
    return this.http.get(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`, { headers: this.getVlrHeaders() });
  }

  getMMR(name: string, tag: string) {
    return this.http.get(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${name}/${tag}`, { headers: this.getVlrHeaders() });
  }

  // Chiamata al tuo Coach su Vercel
  getAiCoachAnalysis(reportData: any): Observable<any> {
    const url = 'https://val-app-three.vercel.app/api/coach';
    return this.http.post(url, { stats: reportData });
  }

  getRankTiers(): Observable<any> {
    return this.http.get('https://valorant-api.com/v1/competitivetiers');
  }



  getDashboardData(region: string, name: string, tag: string) {
    const apiUrl = `https://api.henrikdev.xyz/valorant/v3/matches/${region}/${name}/${tag}?size=20`;

    return this.http.get<any>(apiUrl, { headers: this.getVlrHeaders() }).pipe(
      map(response => {
        const matches = response.data || [];
        return {
          matches: matches,
          stats: this.calculateGlobalStats(matches, name)
        };
      })
    );
  }

  private calculateGlobalStats(matches: any[], name: string) {
    let totalKills = 0;
    let totalDeaths = 0;
    let totalHeadshots = 0;
    let totalShots = 0;
    let wins = 0;

    matches.forEach(m => {
      const me = m.players?.all_players?.find((p: any) =>
        p.name.toLowerCase() === name.toLowerCase()
      );

      if (me) {
        totalKills += me.stats.kills;
        totalDeaths += me.stats.deaths;
        totalHeadshots += me.stats.headshots;
        totalShots += (me.stats.headshots + me.stats.bodyshots + me.stats.legshots);

        const myTeam = me.team.toLowerCase() as 'red' | 'blue';
        if (m.teams[myTeam]?.has_won) {
          wins++;
        }
      }
    });

    return {
      kd: (totalKills / Math.max(1, totalDeaths)).toFixed(2),
      winrate: matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0,
      hs: totalShots > 0 ? Math.round((totalHeadshots / totalShots) * 100) : 0
    };
  }
}