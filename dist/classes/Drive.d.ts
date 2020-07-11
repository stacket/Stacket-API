import Action from "../interfaces/Action";
import _Drive from "../interfaces/Drive";
import Service from "./Service";
import Subuser from "../interfaces/Subuser";
import Access from "../interfaces/Access";
/**
 * Represents a Stacket virtual disk.
 */
export default class Drive {
    private props;
    private token;
    private access?;
    constructor(props: _Drive, token: string, access?: Access | undefined);
    /**
     * Gets the ID of this virtual disk..
     */
    getId(): string;
    /**
     * Gets the name of this virtual disk..
     */
    getName(): string;
    /**
     * Gets the access information of this disk.
     */
    getAccess(): Promise<Access>;
    /**
     * Gets the size of this virtual disk.
     */
    getSize(): number;
    /**
     * Gets the usage of this virtual disk.
     */
    getUsed(): number;
    /**
     * Gets the team ID of this network, if it's owned by a team. For personal networks, this will return null.
     */
    getTeamId(): string | null;
    /**
     * Gets the subusers of this virtual disk.
     */
    getSubusers(): Subuser[];
    /**
     * Connects this virtual disk to a service.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    connect(service: string | Service, diskPath: string, servicePath: string): Promise<NetworkConnectResult>;
    /**
     * Disconnects this virtual disk from a service.
     * @returns {Promise<NetworkDisconnectResult>} The result of the request
     */
    disconnect(service: string | Service): Promise<NetworkDisconnectResult>;
    /**
     * Sets the size (in gigabytes) of this virtual disk.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    setSize(size: number): Promise<NetworkConnectResult>;
    /**
    * Re-names this virtual disk.
    * @returns {Promise<NetworkConnectResult>} The result of the request
    */
    setName(name: string): Promise<NetworkConnectResult>;
    /**
     * Gets the full history of all actions ever performed on this virtual disk.
     * @returns {Promise<Action[]>} All actions ever performed on this virtual disk
     */
    getActions(): Promise<Action[]>;
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
