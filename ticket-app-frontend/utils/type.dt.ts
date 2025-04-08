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