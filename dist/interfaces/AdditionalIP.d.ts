export default interface AdditionalIP {
    _id: string;
    name: string;
    ip: string;
    type: "ipv4" | "ipv6";
    node: string;
    owner?: string;
    team?: {
        id: string;
    };
}
