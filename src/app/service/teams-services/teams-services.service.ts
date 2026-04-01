import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TeamsServicesService {
  private apiUrl = "https://vlr.orlandomm.net/api/v1/teams";

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams`);
  }


  getTeamDetail(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams/${id}`);
  }
}
