import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  private url = 'https://valorant-api.com/v1/weapons'

  constructor(private http: HttpClient) { }

  getWeapons(): Observable<any> {
     return this.http.get<{ data: any[] }>(this.url).pipe(map(res => res.data));
  }

  getWeaponByUuid(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${uuid}`);
  }
}
