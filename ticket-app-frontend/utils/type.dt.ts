export interface CreateEventParams {
    name: string;
    description: string;
    eventArt: string;
    eventDate: number | string;
    location: string;
    thumbnail: string;
    ticketPrice: number;
    totalTickets: number;
}

export interface TruncateParams {
    text: string
    startChars: number
    endChars: number
    maxLength: number
}


export interface EventStruct {
    id: number;
    name: string;
    description: string;
    location: string;
    eventArt: string;
    thumbnail: string;
    eventDate: bigint;
    ticketPrice: bigint;
    totalTickets: bigint;
    ticketsSold: bigint;
    organizer: string;
    isCancelled: boolean;
}