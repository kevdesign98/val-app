import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  // Ripristiniamo l'URL corretto dell'API esterna
  private apiKey = environment.apiKey; // Prende la chiave dal file env

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': this.apiKey.trim(), // Rimuove eventuali spazi invisibili
      'Accept': 'application/json'
    });
  }

  /** Account info */
  getAccount(name: string, tag: string): Observable<any> {
    return this.http.get(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`, {
      headers: this.getHeaders()
    });
  }

  /** Match history */
  getMatchHistory(name: string, tag: string): Observable<any> {
    // Pulito lo slash doppio se presente e aggiunto headers
    return this.http.get(`https://api.henrikdev.xyz/valorant/v3/matches/eu/${name}/${tag}?size=10`, {
      headers: this.getHeaders()
    });
  }

  /** MMR info */
  // stats.service.ts

  // Per il box del Rank attuale (Oggetto singolo)
  getMMR(name: string, tag: string) {
    return this.http.get(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${name}/${tag}`, {
      headers: this.getHeaders()
    });
  }

  // Per il Grafico (Array di match)
  getMMRHistory(name: string, tag: string) {
    return this.http.get(`https://api.henrikdev.xyz/valorant/v1/mmr-history/eu/${name}/${tag}`, {
      headers: this.getHeaders()
    });
  }

  /** Lifetime stats */
  getLifetimeStats(name: string, tag: string): Observable<any> {
    return this.http.get(`https://api.henrikdev.xyz/valorant/v1/lifetime/matches/eu/${name}/${tag}`, {
      headers: this.getHeaders()
    });
  }
  // Aggiungi questo metodo nella classe StatsService
  getAiCoachAnalysis(kd: number, hs: number, wr: number) {
    // Puntiamo alla rotta relativa /api/coach che abbiamo configurato nel vercel.json
    const url = '/api/coach';
    const body = {
      stats: { kd, hs, wr }
    };

    return this.http.post(url, body);
  }
}