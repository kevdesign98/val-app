import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TeamsServicesService {
  private apiUrl = "https://vlr.orlandomm.net/api/v1";

  constructor(private http: HttpClient) {}

 getAllTeams(): Observable<any> {
  // Usiamo l'endpoint che hai testato e che restituisce i 50 team
  return this.http.get(`${this.apiUrl}/teams`);
}

  // Metodo per ottenere i dettagli di un team specifico (inclusi i player)
  // L'ID lo prenderemo dalla lista generale
  getTeamDetail(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams/${id}`);
  }
}
