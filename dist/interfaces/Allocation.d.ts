export default interface Allocation {
    id: string;
    type: string;
    disabled: boolean;
    public: number;
    target: number;
    ip: string;
    udp: boolean;
}
