import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MapsService {

  private url = 'https://valorant-api.com/v1/maps';
 
  constructor(private http: HttpClient) { }

  getAllMaps(): Observable<any> {
    return this.http.get(this.url);
  }

   getMapByUuid(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${uuid}`);
  }

  // getAllMaps() {
  //   return [
  //     { name: 'Abyss', image: 'assets/maps/abyss.png', slug: 'abyss' },
  //     { name: 'Ascent', image: 'assets/maps/ascent.png', slug: 'ascent' },
  //     { name: 'Bind', image: 'assets/maps/bind.png', slug: 'bind' },
  //     { name: 'Breeze', image: 'assets/maps/breeze.png', slug: 'breeze' },
  //     { name: 'Fracture', image: 'assets/maps/fracture.png', slug: 'fracture' },
  //     { name: 'Haven', image: 'assets/maps/haven.png', slug: 'haven' },
  //     { name: 'Icebox', image: 'assets/maps/icebox.png', slug: 'icebox' },
  //     { name: 'Lotus', image: 'assets/maps/lotus.png', slug: 'lotus' },
  //     { name: 'Pearl', image: 'assets/maps/pearl.png', slug: 'pearl' },
  //     { name: 'Split', image: 'assets/maps/split.png', slug: 'split' },
  //     { name: 'Sunset', image: 'assets/maps/sunset.png', slug: 'sunset' },
  //   ]
  // }
}
