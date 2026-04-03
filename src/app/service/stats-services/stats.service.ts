import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  // Ripristiniamo l'URL corretto dell'API esterna
  private baseUrl = 'https://api.henrikdev.xyz/valorant';
  private apiKey = 'HDEV-1a41bab6-5e32-4f8b-9cf9-b3c269ce1aa4';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': this.apiKey.trim(), // Rimuove eventuali spazi invisibili
      'Accept': 'application/json'
    });
  }

  /** Account info */
  getAccount(name: string, tag: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/account/${name}/${tag}`, {
      headers: this.getHeaders()
    });
  }

  /** Match history */
  getMatchHistory(name: string, tag: string): Observable<any> {
    // Pulito lo slash doppio se presente e aggiunto headers
    return this.http.get(`${this.baseUrl}/v3/matches/eu/${name}/${tag}?size=10`, {
      headers: this.getHeaders()
    });
  }

  /** MMR info */
  getMMR(name: string, tag: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/mmr/eu/${name}/${tag}`, {
      headers: this.getHeaders()
    });
  }

  /** Lifetime stats */
  getLifetimeStats(name: string, tag: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/lifetime/matches/eu/${name}/${tag}`, {
      headers: this.getHeaders()
    });
  }
}