import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private baseUrl = 'https://api.henrikdev.xyz/valorant';

  constructor(private http: HttpClient) { }

  /** Account info */
  getAccount(name: string, tag: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/account/${name}/${tag}`);
  }

  /** Match history */
  getMatchHistory(name: string, tag: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v3/matches/eu/${name}/${tag}?size=10`);
  }

  /** MMR info */
  getMMR(name: string, tag: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/mmr/eu/${name}/${tag}`);
  }

  /** Lifetime stats */
  getLifetimeStats(name: string, tag: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/lifetime/matches/eu/${name}/${tag}`);
  }
}

