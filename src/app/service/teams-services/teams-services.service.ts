import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TeamsServicesService {
  private apiUrl = "https://vlr.orlandomm.net/api/v1";
  constructor(private http: HttpClient) {}

  getTeams(region: string = "emea"): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams?region=${region}`);
  }

  //dettagli di un singolo team (inclusi i player)
  getTeamDetail(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams/${id}`);
  }
}
