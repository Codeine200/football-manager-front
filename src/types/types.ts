export type PageResponse<T> = {
    items: T[];
    totalPages: number;
    totalElements: number;
    page: number;
    size: number;
};

export type Player = {
    id: number;
    fullName: string;
    photo?: string;
    team?: Team;
};

export type MatchInfo = {
    id: number;
    matchDateTime: string;
    team1: Team;
    team2: Team;
};

export type Team = {
    id: number;
    name: string;
    imageUrl?: string;
}

export type TeamResult = Team & {
    goals: number;
}

export type TeamDetails = Team & {
    players: Player[];
}

export type MatchResult = {
    id: number;
    team1: TeamResult;
    team2: TeamResult;
};

export type TeamStatsBySeason = Record<number, TeamTournamentStats[]>;

export interface TeamTournamentStats {
    team: Team;
    season: number;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}