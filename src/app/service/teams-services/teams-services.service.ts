import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TeamsServicesService {
  // 1. RIMOSSO lo slash finale da qui
  private apiUrl = "https://vlr.orlandomm.net/api/v1";

  constructor(private http: HttpClient) { }

  getAllTeams(region: string): Observable<any> {
    let apiRegion = 'europe';
    if (region === 'AMERICAS') apiRegion = 'na';
    if (region === 'PACIFIC') apiRegion = 'ap';

    return this.http.get(`${this.apiUrl}/teams?region=${apiRegion}`);
  }

  getTeamDetail(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams/${id}`);
  }
}