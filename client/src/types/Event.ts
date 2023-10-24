export type Venue = {
    id: string,
    name: string,
    contentUrl: string,
    live: boolean,
    direction: string,
}
export type Artist = {
    id: string,
    name: string,
    oid: string, ///
}
export interface Event {
    _id: string,
    title: string,
    flyerFront: string,
    attending: number,
    date: string,
    startTime: string,
    endTime: string,
    contentUrl: string,
    venue: Venue,
    artists: Artist[],
    city: string,
    country: string,
    private: boolean,
    __v: number,
}
export interface OneEvent {
    _id: string,
    title: string,
    flyerFront: string,
    attending: number,
    date: string,
    startTime: string,
    endTime: string,
    contentUrl: string,
    city: string,
    country: string,
}