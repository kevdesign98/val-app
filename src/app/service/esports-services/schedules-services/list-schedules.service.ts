import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListSchedulesService {

  private url = 'https://vlr.orlandomm.net/api/v1/matches'


  constructor(private http: HttpClient) { }
  getSchedule(): Observable<any> {
    return this.http.get(this.url, {
      observe: 'body',
      responseType: 'json'
    });
  }
}