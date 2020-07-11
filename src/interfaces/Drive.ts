import Subuser from "./Subuser";

export default interface Drive {
    _id: string,
    name: string,
    size: number,
    subusers: Subuser[],
    used: number,
    password: string,
    owner: string,
    team?: {
        id: string
    }
}