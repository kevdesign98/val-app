export interface Matches {
    id: string;
    date: Date;
    map: string;
    agent: string;
    result: 'Win' | 'Loss' | 'Draw';
    score: string; // es: "13-5"

    // Statistiche Base
    kills: number;
    deaths: number;
    assists: number;

    // Parametri per l'AI (Il "Cibo" del Coach)
    acs: number;                // Average Combat Score
    headshotPercentage: number; // Per capire la qualità della mira
    adr: number;                // Average Damage per Round (fondamentale!)
    firstBloods: number;        // Indica aggressività vincente
    firstDeaths: number;        // Indica aggressività punita (over-peeking)
    econRating: number;
}
