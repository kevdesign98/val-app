import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Matches } from '../../models/matches';

@Injectable({
  providedIn: 'root'
})
export class ValorantService {

  constructor() { }

  private mockMatches: Matches[] = [
    {
      id: '1',
      date: new Date('2026-04-01'),
      map: 'Ascent',
      agent: 'Jett',
      result: 'Win',
      score: '13-10',
      kills: 22,
      deaths: 15,
      assists: 4,
      acs: 285,
      headshotPercentage: 18,
      adr: 155,
      firstBloods: 5,
      firstDeaths: 6, // Qui l'AI dirà: "Troppi primi morti, occhio ai peek!"
      econRating: 1.2
    },
    {
      id: '2',
      date: new Date('2026-04-01'),
      map: 'Bind',
      agent: 'Brimstone',
      result: 'Loss',
      score: '9-13',
      kills: 12,
      deaths: 18,
      assists: 10,
      acs: 170,
      headshotPercentage: 12,
      adr: 110,
      firstBloods: 1,
      firstDeaths: 2,
      econRating: 0.9
    },
    {
      id: '3',
      date: new Date('2026-04-01'),
      map: 'Haven',
      agent: 'Jett',
      result: 'Win',
      score: '13-5',
      kills: 25,
      deaths: 8,
      assists: 3,
      acs: 340,
      headshotPercentage: 25,
      adr: 195,
      firstBloods: 7,
      firstDeaths: 1, // Match perfetto: l'AI farà i complimenti
      econRating: 1.5
    }
  ];

  getMatches(): Observable<Matches[]> {
    return of(this.mockMatches);
  }
}
