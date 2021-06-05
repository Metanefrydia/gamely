export interface UserGame {
    game?: string;
    rank?: string;
    numberOfHours?: number;
}

export interface UserData {
    _id: string;
    email: string;
    name: string;
    description?: string;
    birthYear?: number;
    games?: UserGame[];
    createdAnnouncements: string[];
}