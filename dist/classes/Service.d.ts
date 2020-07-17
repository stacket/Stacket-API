import Action from "../interfaces/Action";
import _Service from "../interfaces/Service";
import Usage from "../interfaces/Usage";
import { Type } from "../types/Type";
import Allocation from "../interfaces/Allocation";
import { ServiceNetwork, ServiceNodeNetwork } from "../interfaces/Network";
import { Status } from "../types/Status";
import { Payment } from "../types/Payment";
import Subuser from "../interfaces/Subuser";
import User from "../interfaces/User";
import Disk from "../interfaces/Disk";
import Settings from "../interfaces/Settings";
import ServiceUpdateBody from "../interfaces/ServiceUpdateBody";
import Access from "../interfaces/Access";
import FTP from "../interfaces/FTP";
/**
 * Represents a Stacket service.
 */
export default class Service {
    private props;
    private token;
    private access?;
    constructor(props: _Service, token: string, access?: Access | undefined);
    /**
     * Gets the ID of this service.
     */
    getId(): string;
    /**
     * Gets the name of this service.
     */
    getName(): string;
    /**
     * Gets the access information of this service.
     */
    getAccess(): Promise<Access>;
    /**
     * Gets the type of this service.
     */
    getType(): Type;
    /**
     * Gets the version of this service.
     */
    getVersion(): string;
    /**
     * Gets the allocations of this service.
     */
    getAllocations(): Allocation[];
    /**
     * Gets the networks this service is connected to.
     */
    getNetworks(): ServiceNetwork[];
    /**
     * Gets the node this service is hosted on.
     */
    getNode(): string;
    /**
     * Gets the storage server of this service.
     */
    getStorage(): string;
    /**
     * Gets the package of this service.
     */
    getPackage(): string;
    /**
     * Gets the status of this service.
     */
    getStatus(): Status;
    /**
     * Gets the payment interval for this service.
     */
    getPayment(): Payment;
    /**
     * Gets the subusers of this service.
     */
    getSubusers(): Subuser[];
    /**
     * Gets the environment of this service.
     */
    getEnvironment(): object;
    /**
     * Gets the owner of this service.
     */
    getOwner(): User;
    /**
     * Gets the virtual disks mounted to this service.
     */
    getDisk(): Disk[];
    /**
     * Gets the settings of this service.
     */
    getSettings(): Settings;
    /**
     * Gets the team ID of this service, if it's owned by a team. For personal services, this will return null.
     */
    getTeamId?(): string | null;
    /**
     * Powers this service on.
     * @returns {Promise<Action>} The result of the request
     */
    powerOn(): Promise<Action>;
    /**
     * Powers this service off.
     * @returns {Promise<Action>} The result of the request
     */
    powerOff(): Promise<Action>;
    /**
     * Kills this service.
     * @returns {Promise<Action>} The result of the request
     */
    kill(): Promise<Action>;
    /**
     * Activates this service to wake it up from hibernation.
     * @returns {Promise<Action>} The result of the request
     */
    activate(): Promise<Action>;
    /**
     * Hibernates and then activates your service again. Your service must be `offline` or `hibernated` to use this.
     * @returns {Promise<Action>} The result of the request
     */
    reactivate(): Promise<Action>;
    /**
     * Hibernates this service.
     * @returns {Promise<Action>} The result of the request
     */
    hibernate(): Promise<Action>;
    /**
     * Services such as CSGO will run update action as steamcmd update.
     * @returns {Promise<Action>} The result of the request
     */
    update(): Promise<Action>;
    /**
     * Automatically installs all node modules your Node.js service depends on from your `package.json` file.
     * @returns {Promise<Action>} The result of the request
     */
    npminstall(): Promise<Action>;
    /**
     * Gets the current CPU, RAM and Disk usage of this service.
     * @returns {Promise<Usage>} This service's resource usage
     */
    getUsage(): Promise<Usage>;
    /**
     * Gets the IP Address of the service node.
     * @returns {Promise<ServiceNodeNetwork>} This service's node ip
     */
    getIP(): Promise<ServiceNodeNetwork>;
    /**
     * Gets the full history of all actions ever performed on this service.
     * @returns {Promise<Action[]>} All actions ever performed on this service
     */
    getActions(): Promise<Action[]>;
    /**
     * Gets an action performed on this service given its ID.
     * @returns {Promise<Action>} The result of the request
     */
    getAction(id: string): Promise<Action>;
    /**
     * Deletes this service. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    delete(): Promise<void>;
    /**
     * Re-names this service.
     */
    setName(name: string): Promise<object>;
    /**
     * Changes the version this service.
     */
    setVersion(platform: string, version: string): Promise<object>;
    /**
     * Changes the package this service.
     */
    setPackage(_package: string): Promise<object>;
    /**
     * Sets whether this service will auto restart on crash or not.
     */
    setAutoRestart(enabled: boolean): Promise<object>;
    /**
     * Sets the firmware of this service.
     */
    setFirmware(firmware: string): Promise<object>;
    /**
     * Changes the value of an environment variable on this service.
     */
    setEnvironment(key: string, value: any): Promise<object>;
    /**
     * Modifies an existing allocation on this service.
     */
    editAllocation(id: string, ip?: string, _public?: number, target?: number, udp?: boolean, disabled?: boolean): Promise<object>;
    /**
     * Disables an existing allocation on this service.
     */
    disableAllocation(id: string): Promise<object>;
    /**
     * Deletes an allocation from this service.
     */
    deleteAllocation(id: string): Promise<object>;
    /**
     * Adds a new allocation to this service.
     */
    addAllocation(disabled: boolean, ip: string, _public: number, target: number, udp: boolean): Promise<object>;
    /**
     * Gets all FTP logins for this service.
     */
    getFTP(): Promise<FTP[]>;
    /**
     * Creates a new FTP login for this service.
     */
    newFTP(name: string, password: string, path: string): Promise<FTP>;
    /**
     * Edits an FTP login for this service.
     */
    editFTP(id: string, settings: {
        name?: string;
        password?: string;
        path?: string;
    }): Promise<object>;
    /**
     * Deletes an FTP login from this service.
     */
    deleteFTP(id: string): Promise<object>;
    /**
     * Bulk update this service.
     */
    bulkUpdate(body: ServiceUpdateBody): Promise<object>;
}
