import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListResultsService {

  private url = 'https://vlr.orlandomm.net/api/v1/results'

  constructor(private http: HttpClient) { }

  getResults(): Observable<any> {
    return this.http.get(this.url)
  }
}
