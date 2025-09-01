import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
export interface Callout {
  regionName: string;
  superRegionName: string;
  location: { x: number; y: number };
}
@Injectable({
  providedIn: 'root'
})


export class MapsService {

  private url = 'https://valorant-api.com/v1/maps';


  constructor(private http: HttpClient) { }

  getAllMaps(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(this.url).pipe(
      map((res) => res.data)
    );
  }

   getMapByUuid(uuid: string): Observable<any> {
    return this.http
      .get<{ data: any }>(`${this.url}/${uuid}`)
      .pipe(map((res) => res.data));
  }
}
