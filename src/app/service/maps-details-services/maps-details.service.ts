import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsDetailsService {

  private url = ' https://valorant-api.com/v1/maps';

  constructor(private http: HttpClient) { }

  getMapsDetails(): Observable<any> {
    return this.http.get(this.url);
  }
}
// public getMapsDetails =
//   [{
//     name: 'Abyss',
//     slug: 'abyss',
//     description: 'A floating map over a massive abyss with vertical zipline action.',
//     sites: 2,
//     releaseDate: 'Jun 2024',
//     image: 'assets/maps-details/abyss.png',
//     attackStrategies: ['Zipline push A', 'B split through lower bridge'],
//     defenseStrategies: ['Anchor B from back site', 'Control top mid'],
//     lineups: [
//       { agent: 'Omen', tips: ['Shrouded Step to top ledge'] }
//     ],
//     keySpots: ['Top Mid', 'Bridge', 'Back A']
//   },
//   {
//     name: 'Ascent',
//     slug: 'ascent',
//     description: 'A map set in Italy with an open central area that offers critical control.',
//     sites: 2,
//     releaseDate: 'Jun 2020',
//     image: 'assets/maps-details/ascent.png',
//     attackStrategies: ['Split A through Mid and A Main'],
//     defenseStrategies: ['Hold Mid from Market'],
//     lineups: [
//       { agent: 'Sova', tips: ['Recon from B Lobby that scans Boat House'] }
//     ],
//     keySpots: ['Heaven', 'Market', 'Tree']
//   },
//   {
//     name: 'Breeze',
//     slug: 'breeze',
//     description: 'A wide-open map with long sightlines and ancient ruins.',
//     sites: 2,
//     releaseDate: 'Apr 2021',
//     image: 'assets/maps-details/breeze.png',
//     attackStrategies: ['Mid control then split A or B'],
//     defenseStrategies: ['Hold Mid Pillar'],
//     lineups: [
//       { agent: 'Viper', tips: ['Toxic screen across A Site'] }
//     ],
//     keySpots: ['Hall', 'Nest', 'Cave']
//   },
//   {
//     name: 'Bind',
//     slug: 'bind',
//     description: 'Teleporters allow fast rotations across the desert-themed map.',
//     sites: 2,
//     releaseDate: 'Apr 2020',
//     image: 'assets/maps-details/bind.png',
//     attackStrategies: ['Execute B using Long and Hookah', 'Fake A then rotate through TP'],
//     defenseStrategies: ['Aggressively push Short A', 'Hold U-Hall'],
//     lineups: [
//       { agent: 'Viper', tips: ['Snakebite for post-plant from Garden'] }
//     ],
//     keySpots: ['U-Hall', 'Hookah', 'Elbow']
//   },
//   {
//     name: 'Corrode',
//     slug: 'corrode',
//     description: 'An industrial wasteland map with toxic zones and corrosion hazards.',
//     sites: 2,
//     releaseDate: 'Jul 2024',
//     image: 'assets/maps-details/corrode.png',
//     attackStrategies: ['Use utility to clear toxic vents on B'],
//     defenseStrategies: ['Early aggression through corrosion corridors'],
//     lineups: [
//       { agent: 'Harbor', tips: ['Cascade through toxic tunnel'] }
//     ],
//     keySpots: ['Toxic Tunnel', 'Backsite A', 'Control Room']
//   },
//   {
//     name: 'Fracture',
//     slug: 'fracture',
//     description: 'Unique ziplines and attacker spawn split the map into four quadrants.',
//     sites: 2,
//     releaseDate: 'Sep 2021',
//     image: 'assets/maps-details/fracture.png',
//     attackStrategies: ['Split B from Arcade and Main'],
//     defenseStrategies: ['Retake A Site from Rope Room'],
//     lineups: [
//       { agent: 'KAY/O', tips: ['Suppress from Dish'] }
//     ],
//     keySpots: ['Dish', 'Arcade', 'Rope Room']
//   },
//   {
//     name: 'Haven',
//     slug: 'haven',
//     description: 'The only map with 3 bomb sites, requiring flexible control.',
//     sites: 3,
//     releaseDate: 'Apr 2020',
//     image: 'assets/maps-details/haven.png',
//     attackStrategies: ['Split B from Garage and Mid Window'],
//     defenseStrategies: ['Early info from A Long', 'Control C Site with OP'],
//     lineups: [
//       { agent: 'Killjoy', tips: ['Nanoswarm for C Default'] }
//     ],
//     keySpots: ['Garage', 'A Long', 'C Site']
//   },
//   {
//     name: 'Icebox',
//     slug: 'icebox',
//     description: 'A cold industrial map with vertical fights and zip lines.',
//     sites: 2,
//     releaseDate: 'Oct 2020',
//     image: 'assets/maps-details/icebox.png',
//     attackStrategies: ['Plant under Tube on B', 'Take A Nest quickly'],
//     defenseStrategies: ['Anchor A Site behind Screens'],
//     lineups: [
//       { agent: 'Sova', tips: ['Recon B Site default from Yellow'] }
//     ],
//     keySpots: ['Tube', 'Nest', 'Yellow']
//   },
//   {
//     name: 'Lotus',
//     slug: 'lotus',
//     description: 'Three-site map with rotating doors and destructible walls.',
//     sites: 3,
//     releaseDate: 'Jan 2023',
//     image: 'assets/maps-details/lotus.png',
//     attackStrategies: ['Fast C Rush through Waterfall'],
//     defenseStrategies: ['Control A Root and C Site early'],
//     lineups: [
//       { agent: 'Gekko', tips: ['Wingman plant on B'] }
//     ],
//     keySpots: ['Waterfall', 'A Root', 'C Hall']
//   },
//   {
//     name: 'Pearl',
//     slug: 'pearl',
//     description: 'Underwater city map with tight corridors and clean geometry.',
//     sites: 2,
//     releaseDate: 'Jun 2022',
//     image: 'assets/maps-details/pearl.png',
//     attackStrategies: ['Control Mid Plaza then B Link'],
//     defenseStrategies: ['Anchor A Site from Flowers'],
//     lineups: [
//       { agent: 'Fade', tips: ['Haunt on B Pillar from Main'] }
//     ],
//     keySpots: ['Flowers', 'Plaza', 'B Link']
//   },
//   {
//     name: 'Split',
//     slug: 'split',
//     description: 'Verticality defines this map with ropes and tight corners.',
//     sites: 2,
//     releaseDate: 'Apr 2020',
//     image: 'assets/maps-details/split.png',
//     attackStrategies: ['Control Mid, then split B Heaven'],
//     defenseStrategies: ['Push A Main early'],
//     lineups: [
//       { agent: 'Breach', tips: ['Aftershock on B Site Default'] }
//     ],
//     keySpots: ['Heaven', 'Mail', 'Screens']
//   },
//   {
//     name: 'Sunset',
//     slug: 'sunset',
//     description: 'Los Angeles-inspired map with Mid control importance.',
//     sites: 2,
//     releaseDate: 'Aug 2023',
//     image: 'assets/maps-details/sunset.png',
//     attackStrategies: ['Take Mid then split A'],
//     defenseStrategies: ['Double up A Main early'],
//     lineups: [
//       { agent: 'Skye', tips: ['Flash from Mid Link'] }
//     ],
//     keySpots: ['A Alley', 'Mid Market', 'Garage']
//   },
//   //  {
//   //   name: 'District',
//   //   slug: 'district',
//   //   description: '',
//   //   sites: 2,
//   //   releaseDate: 'Aug 2023',
//   //   image: 'assets/maps-details/district.png',
//   //   attackStrategies: ['Take Mid then split A'],
//   //   defenseStrategies: ['Double up A Main early'],
//   //   lineups: [
//   //     { agent: 'Skye', tips: ['Flash from Mid Link'] }
//   //   ],
//   //   keySpots: ['A Alley', 'Mid Market', 'Garage']
//   // },
//   //  {
//   //   name: 'Kasbah',
//   //   slug: 'kasbah',
//   //   description: '',
//   //   sites: 2,
//   //   releaseDate: 'Aug 2023',
//   //   image: 'assets/maps-details/kasbah.png',
//   //   attackStrategies: ['Take Mid then split A'],
//   //   defenseStrategies: ['Double up A Main early'],
//   //   lineups: [
//   //     { agent: 'Skye', tips: ['Flash from Mid Link'] }
//   //   ],
//   //   keySpots: ['A Alley', 'Mid Market', 'Garage']
//   // },
//   //  {
//   //   name: 'Drift',
//   //   slug: 'drift',
//   //   description: '',
//   //   sites: 2,
//   //   releaseDate: 'Aug 2023',
//   //   image: 'assets/maps-details/drift.png',
//   //   attackStrategies: ['Take Mid then split A'],
//   //   defenseStrategies: ['Double up A Main early'],
//   //   lineups: [
//   //     { agent: 'Skye', tips: ['Flash from Mid Link'] }
//   //   ],
//   //   keySpots: ['A Alley', 'Mid Market', 'Garage']
//   // },
//   //  {
//   //   name: 'Glitch',
//   //   slug: 'glitch',
//   //   description: '',
//   //   sites: 2,
//   //   releaseDate: 'Aug 2023',
//   //   image: 'assets/maps-details/glitch.png',
//   //   attackStrategies: ['Take Mid then split A'],
//   //   defenseStrategies: ['Double up A Main early'],
//   //   lineups: [
//   //     { agent: 'Skye', tips: ['Flash from Mid Link'] }
//   //   ],
//   //   keySpots: ['A Alley', 'Mid Market', 'Garage']
//   // },
//   //  {
//   //   name: 'Piazza',
//   //   slug: 'piazza',
//   //   description: '',
//   //   sites: 2,
//   //   releaseDate: 'Aug 2023',
//   //   image: 'assets/maps-details/piazza.png',
//   //   attackStrategies: ['Take Mid then split A'],
//   //   defenseStrategies: ['Double up A Main early'],
//   //   lineups: [
//   //     { agent: 'Skye', tips: ['Flash from Mid Link'] }
//   //   ],
//   //   keySpots: ['A Alley', 'Mid Market', 'Garage']
//   // }
//   ];

// getAllMaps() {
//   return this.getMapsDetails;
// }

// getMapBySlug(slug: string) {
//   return this.getMapsDetails.find(getMapsDetails => getMapsDetails.slug === slug);
// }






