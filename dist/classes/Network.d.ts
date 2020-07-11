import Action from "../interfaces/Action";
import _Network from "../interfaces/Network";
import Service from "./Service";
import Access from "../interfaces/Access";
/**
 * Represents a Stacket network
 */
export default class Network {
    private props;
    private token;
    private access?;
    constructor(props: _Network, token: string, access?: Access | undefined);
    /**
     * Gets the ID of this network.
     */
    getId(): string;
    /**
     * Gets the name of this network.
     */
    getName(): string;
    /**
     * Gets the access information of this network.
     */
    getAccess(): Promise<Access>;
    /**
     * Gets the type of this network.
     */
    getType(): "ipv4" | "ipv6";
    /**
     * Gets the IP address of this network.
     */
    getIP(): string;
    /**
     * Gets the team ID of this network, if it's owned by a team. For personal networks, this will return null.
     */
    getTeamId(): string | null;
    /**
     * Gets the internal Network ID of this network.
     */
    getNetworkId(): string;
    /**
     * Connects a service to a network.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    connect(service: string | Service): Promise<NetworkConnectResult>;
    /**
     * Powers this service off.
     * @returns {Promise<NetworkDisconnectResult>} The result of the request
     */
    disconnect(service: string | Service): Promise<NetworkConnectResult>;
    /**
     * Deletes this network. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    delete(): Promise<void>;
}
export interface NetworkConnectResult {
    error?: string;
    type: string;
    ipv6: string;
    action: Action;
}
export interface NetworkDisconnectResult {
    error?: string;
    status: string;
    action: Action;
}
