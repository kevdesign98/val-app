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

  // stats.service.ts
  getMatchHistory(name: string, tag: string, mode: string = ''): Observable<any> {
    const n = encodeURIComponent(name);
    const t = encodeURIComponent(tag);

    // Forza 'eu' se region non è passata, per evitare 'undefined' nell'URL
    const url = `https://api.henrikdev.xyz/valorant/v3/matches/eu/${n}/${t}?size=20${mode ? '&mode=' + mode.toLowerCase() : ''}`;

    return this.http.get<any>(url, { headers: this.getVlrHeaders() });
  }

  getAccount(name: string, tag: string): Observable<any> {
    const n = encodeURIComponent(name);
    const t = encodeURIComponent(tag);
    return this.http.get(`https://api.henrikdev.xyz/valorant/v1/account/${n}/${t}`, {
      headers: this.getVlrHeaders()
    });
  }

  getMMR(name: string, tag: string): Observable<any> {
    const n = encodeURIComponent(name);
    const t = encodeURIComponent(tag);
    return this.http.get(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${n}/${t}`, {
      headers: this.getVlrHeaders()
    });
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


  /**
 * Calcola le statistiche globali utilizzando il PUUID se il nome è oscurato,
 * o il nome come fallback per compatibilità.
 */
  private calculateGlobalStats(matches: any[], identifier: string) {
    let totalKills = 0;
    let totalDeaths = 0;
    let totalHeadshots = 0;
    let totalShots = 0;
    let wins = 0;

    const searchIdentifier = identifier.trim().toLowerCase();

    matches.forEach((m) => {
      // Cerchiamo il giocatore: 
      // 1. Per PUUID (più affidabile se i nomi sono vuoti)
      // 2. Per Nome (come fallback)
      const me = m.players?.all_players?.find((p: any) =>
        p.puuid === identifier || p.name.toLowerCase().trim() === searchIdentifier
      );

      if (me) {
        // Somma delle statistiche
        totalKills += me.stats?.kills || 0;
        totalDeaths += me.stats?.deaths || 0;
        totalHeadshots += me.stats?.headshots || 0;

        // Calcolo colpi totali per la precisione Headshot
        const shots = (me.stats?.headshots || 0) +
          (me.stats?.bodyshots || 0) +
          (me.stats?.legshots || 0);
        totalShots += shots;

        // Calcolo Winrate
        const myTeam = me.team?.toLowerCase();
        if (myTeam && m.teams && m.teams[myTeam]?.has_won === true) {
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

  getSeasons(): Observable<any> {
    return this.http.get('https://valorant-api.com/v1/seasons');
  }
  getPlayerMatches(region: string, name: string, tag: string): Observable<any> {
    const url = `https://api.henrikdev.xyz/valorant/v3/matches/${region}/${name}/${tag}`;
    // AGGIUNTO: { headers: this.getVlrHeaders() }
    return this.http.get<any>(url, { headers: this.getVlrHeaders() }).pipe(
      map(res => res.data)
    );
  }
}