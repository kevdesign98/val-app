import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListAgentsService {

  private url = 'https://valorant-api.com/v1/agents '

  constructor(private http: HttpClient) { }

  getAgents(): Observable<any> {
    return this.http.get(`${this.url}/agents`); // 🔹 Chiamata API per gli agenti
  }
}
