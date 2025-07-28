export interface Results {
    id: string;
    teams: {
        name: string;
        country: string;
        score: string | null;
        img: string;
    }[];
    status: string;
    event: string;
    tournament: string;
    ago: string;
    timestamp: number;
    img: string;
}
