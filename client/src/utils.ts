import { APiErr } from "./types/ApiErr";

export const getError = ( err: APiErr) => {
    return err.response && err.response.data.message ? err.response.data.message : err.message
}

export const getTotal = ( nb: number) => {
    return nb;
}