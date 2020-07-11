export default interface NewNetworkSettings {
    type: "ipv4" | "ipv6";
    name: string;
    team?: string;
}
