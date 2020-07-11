import Subuser from "./Subuser";

export interface ServiceNetwork {
    id: string,
    ipv6: string
}

export default interface Network {
    _id: string,
    name: string,
    type: "ipv4" | "ipv6",
    ip: string,
    subusers: Subuser[],
    team: {
        id: string
    },
    networkId: string
}