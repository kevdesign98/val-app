import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListAgentsService {

  private url = 'https://valorant-api.com/v1/agents'

  constructor(private http: HttpClient) { }

  getAgents(): Observable<any> {
    return this.http.get(`${this.url}?isPlayableCharacter=true`); //Chiamata API per gli agenti
  }
  getAgentById(id: string) {
    return this.getAgents().pipe(
      map((response: any) => {
        return response.data.find((agent: any) => agent.uuid === id);
      })
    );
  }
}
