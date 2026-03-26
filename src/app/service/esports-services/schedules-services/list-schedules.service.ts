import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListSchedulesService {

  private url = 'https://vlr.orlandomm.net/api/v1/matches'

  constructor(private http: HttpClient) { }

  // list-schedules.service.ts
  getSchedule(): Observable<any> {
    return this.http.get(this.url, {
      // Rimuoviamo eventuali header custom se ne avevi messi
      observe: 'body',
      responseType: 'json'
    });
  }
} 