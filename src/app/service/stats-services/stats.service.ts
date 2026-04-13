import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private vlrApiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  private getVlrHeaders() {
    return new HttpHeaders({
      'Authorization': this.vlrApiKey,
      'Accept': 'application/json'
    });
  }

  // Chiamate a HenrikDev
  getMatchHistory(name: string, tag: string): Observable<any> {
    return this.http.get(`https://api.henrikdev.xyz/valorant/v3/matches/eu/${name}/${tag}?size=20`, {
      headers: this.getVlrHeaders()
    });
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
}