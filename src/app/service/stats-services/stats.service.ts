import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environment/environment';

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

}