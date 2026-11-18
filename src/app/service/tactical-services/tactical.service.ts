import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';



export interface MatchDamage {
  receiver: string;
  damage: number;
  legshots: number;
  bodyshots: number;
  headshots: number;
}

export interface PlayerMatchStats {
  puuid: string;
  team: string;
  stats: { score: number; kills: number; deaths: number; assists: number };
  damage_made: MatchDamage[];
}

export interface MatchDetails {
  metadata: { map: string; matchid: string; mode: string };
  teams: { red: { has_won: boolean }; blue: { has_won: boolean } };
  players: { all_players: PlayerMatchStats[] };
  kills: Array<{
    victim_puuid: string;
    killer_puuid: string;
    victim_death_x: number;
    victim_death_y: number;
    round: number;
  }>;
}


@Injectable({
  providedIn: 'root',
})
export class TacticalService {
  private apiUrl = 'https://api.henrikdev.xyz/valorant/v3/by-puuid/matches';

  constructor(private http: HttpClient) { }

  // Recupera gli ultimi X match e aggrega le statistiche avanzate
  getAdvancedTacticalStats(region: string, puuid: string): Observable<any> {
    return this.http.get<{ data: MatchDetails[] }>(`${this.apiUrl}/${region}/${puuid}?mode=competitive`).pipe(
      map(response => {
        const matches = response.data || [];

        // Strutture di accumulazione
        const mapStats: { [key: string]: { total: number; wins: number } } = {};
        let totalHead = 0, totalBody = 0, totalLeg = 0;
        const heatmapsByMap: { [key: string]: Array<{ x: number; y: number }> } = {};

        matches.forEach(match => {
          const mapName = match.metadata.map;

          // 1. Calcolo Win-Rate per Mappa
          const myPlayer = match.players.all_players.find(p => p.puuid === puuid);
          if (!myPlayer) return;

          const myTeam = myPlayer.team.toLowerCase() as 'red' | 'blue';
          const hasWon = match.teams[myTeam]?.has_won || false;

          if (!mapStats[mapName]) {
            mapStats[mapName] = { total: 0, wins: 0 };
          }
          mapStats[mapName].total++;
          if (hasWon) mapStats[mapName].wins++;

          // 2. Accumulo Anatomia Balistica (Danno fatto)
          myPlayer.damage_made?.forEach(d => {
            totalHead += d.headshots || 0;
            totalBody += d.bodyshots || 0;
            totalLeg += d.legshots || 0;
          });

          // 3. Estrazione coordinate Kill per Heatmap (First Blood o Kill fatte da te)
          if (!heatmapsByMap[mapName]) heatmapsByMap[mapName] = [];

          match.kills?.forEach(kill => {
            if (kill.killer_puuid === puuid) {
              // Convertiamo o salviamo le coordinate native della mappa
              heatmapsByMap[mapName].push({
                x: kill.victim_death_x,
                y: kill.victim_death_y
              });
            }
          });
        });

        // Formattazione finale dei dati per i componenti grafici
        const totalShots = totalHead + totalBody + totalLeg || 1;

        return {
          maps: Object.keys(mapStats).map(name => ({
            name,
            winRate: Math.round((mapStats[name].wins / mapStats[name].total) * 100),
            totalPlayed: mapStats[name].total
          })),
          accuracy: {
            head: Math.round((totalHead / totalShots) * 100),
            body: Math.round((totalBody / totalShots) * 100),
            leg: Math.round((totalLeg / totalShots) * 100)
          },
          heatmaps: heatmapsByMap
        };
      })
    );
  }
}
