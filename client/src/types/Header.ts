import { Event } from "./Event";

export interface HeaderType {
    searchTerm: string,
    cart: Event[],
    cartTotal: number,
}