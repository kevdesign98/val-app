import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListResultsService {
  private url = 'https://vlr.orlandomm.net/api/v1/matches';

  constructor(private http: HttpClient) {}

  getSchedule(): Observable<any> {
    return this.http.get(this.url);
  }
}

