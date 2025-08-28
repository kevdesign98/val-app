export interface ValorantMaps {
    id: string;
    name: string;
    splash: string;
    description: string;
    callouts: string[];
    mechanics: string[];
    lineups?: {
        agent: string;
        type: string;
        description: string;
    }[];
}
