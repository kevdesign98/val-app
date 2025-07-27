export interface TestResult {
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
    utc: string;
    timestamp: number;
    img: string;
}
