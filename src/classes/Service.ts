import axios from "axios";
import Action from "../interfaces/Action";
import { base } from "../config.json";
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

async function control(id: string, state: string, token: string) : Promise<Action> {
    try {
        const result = await axios.post(`${base}/services/${id}/control`, { state: state}, {headers: {Authorization: token}});
        if(result.data.error) throw Error(result.data.error);
        return result.data;
    } catch(e){
        if(e.data && e.data.error) throw Error(e.data.error);
        throw Error(e);
    }
}

async function get(id: string, path: string, token: string) : Promise<any> {
    try {
        const result = await axios.get(`${base}/services/${id}/${path}`, {headers: {Authorization: token}});
        if(result.data.error) throw Error(result.data.error);
        return result.data;
    } catch(e){
        if(e.data && e.data.error) throw Error(e.data.error);
        throw Error(e);
    }
}
async function post(id: string, path: string, body: object, token: string) : Promise<any> {
    try {
        const result = await axios.post(`${base}/services/${id}/${path}`, body, {headers: {Authorization: token}});
        if(result.data.error) throw Error(result.data.error);
        return result.data;
    } catch(e){
        if(e.data && e.data.error) throw Error(e.data.error);
        throw Error(e);
    }
}

async function _delete(id: string, path: string, token: string) : Promise<any> {
    try {
        const result = await axios.delete(`${base}/services/${id}/${path}`, {headers: {Authorization: token}});
        if(result.data.error) throw Error(result.data.error);
        return result.data;
    } catch(e){
        if(e.data && e.data.error) throw Error(e.data.error);
        throw Error(e);
    }
}

    /*
        post /:serviceId 
        - setName ({ name: "new"})
        - setVersion ( { version: string, platform: string } )
        - setPackage ( { package: string } )
        - setSetting ( { settings: { autorestart: boolean, firmware?: string } } )
        - setEnvironment ( { key: string, value: string } )
        - editAllocation ( { id: string, ip: string, public: number, target: number, udp: boolean } )
        - disableAllocation ( { id: string, disabled: boolean } )
        - deleteAllocation ( {id: string delete: boolean } )
        - addAllocation ( { disabled: boolean, ip: string, public: number, target: number, udp: boolean } )
    */

/**
 * Represents a Stacket service.
 */
export default class Service {
    constructor(private props: _Service, private token: string, private access?: Access){}

    /**
     * Gets the ID of this service.
     */
    getId(): string {
        return this.props._id;
    }

    /**
     * Gets the name of this service.
     */
    getName(): string {
        return this.props.name;
    }

    /**
     * Gets the access information of this service.
     */
    async getAccess(): Promise<Access> {
        return new Promise(async (resolve, reject) => {
            if(this.access) return resolve(this.access);

            try {
                const data: any = await get(this.getId(), "", this.token);
                const access: Access = data.access;
                this.access = access;
                resolve( access );
            } catch(e){
                reject(e);
            }
        });
    }

    /**
     * Gets the type of this service.
     */
    getType(): Type {
        return this.props.type;
    }

    /**
     * Gets the version of this service.
     */
    getVersion(): string {
        return this.props.version;
    }

    /**
     * Gets the allocations of this service.
     */
    getAllocations(): Allocation[] {
        return this.props.allocations;
    }

    /**
     * Gets the networks this service is connected to.
     */
    getNetworks(): ServiceNetwork[] {
        return this.props.networks;
    }

    /**
     * Gets the node this service is hosted on.
     */
    getNode(): string {
        return this.props.node;
    }

    /**
     * Gets the storage server of this service.
     */
    getStorage(): string {
        return this.props.storage;
    }

    /**
     * Gets the package of this service.
     */
    getPackage(): string {
        return this.props.package;
    }

    /**
     * Gets the status of this service.
     */
    getStatus(): Status {
        return this.props.status;
    }

    /**
     * Gets the payment interval for this service.
     */
    getPayment(): Payment {
        return this.props.payment;
    }

    /**
     * Gets the subusers of this service.
     */
    getSubusers(): Subuser[] {
        return this.props.subusers;
    }

    /**
     * Gets the environment of this service.
     */
    getEnvironment(): object {
        return this.props.environment;
    }

    /**
     * Gets the owner of this service.
     */
    getOwner(): User {
        return this.props.owner;
    }

    /**
     * Gets the virtual disks mounted to this service.
     */
    getDisk(): Disk[] {
        return this.props.disks;
    }

    /**
     * Gets the settings of this service.
     */
    getSettings(): Settings {
        return this.props.settings;
    }
    
    /**
     * Gets the team ID of this service, if it's owned by a team. For personal services, this will return null.
     */
    getTeamId?(): string | null {
        return (this.props.team ? this.props.team.id : null);
    }
    
    /**
     * Powers this service on.
     * @returns {Promise<Action>} The result of the request
     */
    async powerOn(): Promise<Action> {
        return control(this.props._id, "start", this.token);
    }

    /**
     * Powers this service off.
     * @returns {Promise<Action>} The result of the request
     */
    async powerOff(): Promise<Action> {
        return control(this.props._id, "stop", this.token);
    }

    /**
     * Kills this service.
     * @returns {Promise<Action>} The result of the request
     */
    async kill(): Promise<Action> {
        return control(this.props._id, "kill", this.token);
    }

    /**
     * Activates this service to wake it up from hibernation.
     * @returns {Promise<Action>} The result of the request
     */
    async activate(): Promise<Action> {
        return control(this.props._id, "activate", this.token);
    }

    /**
     * Hibernates and then activates your service again. Your service must be `offline` or `hibernated` to use this.
     * @returns {Promise<Action>} The result of the request
     */
    async reactivate(): Promise<Action> {
        return control(this.props._id, "reactivate", this.token);
    }

    /**
     * Hibernates this service.
     * @returns {Promise<Action>} The result of the request
     */
    async hibernate(): Promise<Action> {
        return control(this.props._id, "hibernate", this.token);
    }

    /**
     * Services such as CSGO will run update action as steamcmd update.
     * @returns {Promise<Action>} The result of the request
     */
    async update(): Promise<Action> {
        return control(this.props._id, "update", this.token);
    }

    /**
     * Automatically installs all node modules your Node.js service depends on from your `package.json` file.
     * @returns {Promise<Action>} The result of the request
     */
    async npminstall(): Promise<Action> {
        return control(this.props._id, "npminstall", this.token);
    }

    /**
     * Gets the current CPU, RAM and Disk usage of this service.
     * @returns {Promise<Usage>} This service's resource usage
     */
    async getUsage(): Promise<Usage> {
        return get(this.props._id, "usage", this.token);
    }

    /**
     * Gets the IP Address of the service node.
     * @returns {Promise<ServiceNodeNetwork>} This service's node ip
     */
    async getIP(): Promise<ServiceNodeNetwork> {
        return get(this.props._id, "ip", this.token);
    }

    

    /**
     * Gets the full history of all actions ever performed on this service.
     * @returns {Promise<Action[]>} All actions ever performed on this service
     */
    async getActions(): Promise<Action[]> {
        return get(this.props._id, "actions", this.token);
    }

    /**
     * Gets an action performed on this service given its ID.
     * @returns {Promise<Action>} The result of the request
     */
    async getAction(id: string): Promise<Action> {
        return get(this.props._id, `actions/${id}`, this.token);
    }

    /**
     * Deletes this service. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    async delete(): Promise<void> {
        try {
            const result = await axios.delete(`${base}/services/${this.props._id}`, {headers: {Authorization: this.token}});
            if(result.data.error) throw Error(result.data.error);
            return result.data;
        } catch(e){
            if(e.data && e.data.error) throw Error(e.data.error);
            throw Error(e);
        }
    }

    /**
     * Re-names this service.
     */
    async setName(name: string): Promise<object> {
        return post(this.getId(), "", { name }, this.token);
    }

    /**
     * Changes the version this service.
     */
    async setVersion(platform: string, version: string): Promise<object> {
        return post(this.getId(), "", { version: { platform, version } }, this.token);
    }

    /**
     * Changes the package this service.
     */
    async setPackage(_package: string): Promise<object> {
        return post(this.getId(), "", { "package": _package }, this.token);
    }

    /**
     * Sets whether this service will auto restart on crash or not.
     */
    async setAutoRestart(enabled: boolean): Promise<object> {
        return post(this.getId(), "", { settings: { autorestart: enabled } }, this.token); 
    }

    /**
     * Sets the firmware of this service.
     */
    async setFirmware(firmware: string): Promise<object> {
        return post(this.getId(), "", { settings: { firmware } }, this.token); 
    }
    
    /**
     * Changes the value of an environment variable on this service.
     */
    async setEnvironment(key: string, value: any): Promise<object> {
        return post(this.getId(), "", { environment: { key, value } }, this.token);
    }

    /**
     * Modifies an existing allocation on this service.
     */
    async editAllocation(id: string, ip?: string, _public?: number, target?: number, udp?: boolean, disabled?: boolean): Promise<object> {
        const updateObject: any = { id };
        if(ip) updateObject.ip = ip;
        if(_public) updateObject._public = _public;
        if(target) updateObject.target = target;
        if(udp) updateObject.udp = udp;
        if(disabled) updateObject.disabled = disabled;
        
        return post(this.getId(), "", { allocation: updateObject }, this.token);
    }

    /**
     * Disables an existing allocation on this service.
     */
    async disableAllocation(id: string): Promise<object> {
        return post(this.getId(), "", { allocation: { id, "disabled": true } }, this.token);
    }

    /**
     * Deletes an allocation from this service.
     */
    async deleteAllocation(id: string): Promise<object> {
        return post(this.getId(), "", { allocation: { id, delete: true } }, this.token);
    }

    /**
     * Adds a new allocation to this service.
     */
    async addAllocation(disabled: boolean, ip: string, _public: number, target: number, udp: boolean): Promise<object> {
        return post(this.getId(), "", { allocation: { disabled, ip, "public": _public, target, udp} }, this.token);
    }

    /**
     * Gets all FTP logins for this service.
     */
    async getFTP(): Promise<FTP[]> {
        return get(this.getId(), "ftp", this.token);
    }

    /**
     * Creates a new FTP login for this service.
     */
    async newFTP(name: string, password: string, path: string): Promise<FTP> {
        return post(this.getId(), "ftp", { name, password, path }, this.token);
    }

    /**
     * Edits an FTP login for this service.
     */
    async editFTP(id: string, settings: {name?: string, password?: string, path?: string}): Promise<object> {
        const {name, password, path} = settings;

        const updateObject: any = { id };
        
        if(name) updateObject.name = name;
        if(password) updateObject.password = password;
        if(path) updateObject.path = path;

        return post(this.getId(), "ftp", updateObject, this.token);
    }   

    /**
     * Deletes an FTP login from this service.
     */
    async deleteFTP(id: string): Promise<object> {
        return _delete(this.getId(), `ftp/${id}`, this.token);
    }

    /**
     * Bulk update this service.
     */
    async bulkUpdate(body: ServiceUpdateBody): Promise<object> {
        return post(this.getId(), "", body, this.token);
    }
}