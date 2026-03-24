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

export type Team = {
    id: number;
    name: string;
    imageUrl: string;
}