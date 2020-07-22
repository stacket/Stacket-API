import axios from "axios";
import Action from "../interfaces/Action";
import _Drive from "../interfaces/Drive";
import { base } from "../config.json";
import Service from "./Service";
import Subuser from "../interfaces/Subuser";
import Access from "../interfaces/Access";

async function get(id: string, path: string, token: string) : Promise<any> {
    try {
        const result = await axios.get(`${base}/disks/${id}/${path}`, {headers: {Authorization: token}});
        if(result.data.error) throw Error(result.data.error);
        return result.data;
    } catch(e){
        if(e.data && e.data.error) throw Error(e.data.error);
        throw Error(e);
    }
}
async function post(id: string, path: string, body: object, token: string) : Promise<any> {
    try {
        const result = await axios.post(`${base}/disks/${id}/${path}`, body, {headers: {Authorization: token}});
        if(result.data.error) throw Error(result.data.error);
        return result.data;
    } catch(e){
        if(e.data && e.data.error) throw Error(e.data.error);
        throw Error(e);
    }
}

/**
 * Represents a Stacket virtual disk.
 */
export default class Drive {
    constructor(private props: _Drive, private token: string, private access?: Access){}



    /**
     * Gets the ID of this virtual disk..
     */
    getId(): string {
        return this.props._id;
    }

    /**
     * Gets the name of this virtual disk..
     */
    getName(): string {
        return this.props.name;
    }

    /**
     * Gets the access information of this disk.
     */
    async getAccess(): Promise<Access> {
        return new Promise(async (resolve, reject) => {
            if(this.access) return resolve(this.access);

            const data: any = await get(this.getId(), "", this.token);
            const access: Access = data.access;
            this.access = access;
            resolve( access );
        });
    }

    /**
     * Gets the size of this virtual disk.
     */
    getSize(): number {
        return this.props.size;
    }

    /**
     * Gets the usage of this virtual disk.
     */
    getUsed(): number {
        return this.props.used;
    }

    /**
     * Gets the team ID of this network, if it's owned by a team. For personal networks, this will return null.
     */
    getTeamId(): string | null {
        return this.props.team ? this.props.team.id : null;
    }

    /**
     * Gets the subusers of this virtual disk.
     */
    getSubusers(): Subuser[] {
        return this.props.subusers;
    }

    /**
     * Connects this virtual disk to a service.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    async connect(service: string | Service, diskPath: string, servicePath: string): Promise<NetworkConnectResult> {
        const id = service instanceof Service ? service.getId() : service;
        return post(this.getId(), `connect/${id}`, {path: { "disk": diskPath, "service": servicePath }}, this.token);
    }

    /**
     * Disconnects this virtual disk from a service.
     * @returns {Promise<NetworkDisconnectResult>} The result of the request
     */
    async disconnect(service: string | Service): Promise<NetworkDisconnectResult> {
        const id = service instanceof Service ? service.getId() : service;
        return get(this.getId(), `disconnect/${id}`, this.token);
    }

    /**
     * Sets the size (in gigabytes) of this virtual disk.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    async setSize(size: number): Promise<NetworkConnectResult> {
        return post(this.getId(), ``, {size}, this.token);
    }
    
    /**
    * Re-names this virtual disk.
    * @returns {Promise<NetworkConnectResult>} The result of the request
    */
    async setName(name: string): Promise<NetworkConnectResult> {
        return post(this.getId(), ``, { name }, this.token);
    }

    /**
     * Gets the full history of all actions ever performed on this virtual disk.
     * @returns {Promise<Action[]>} All actions ever performed on this virtual disk
     */
    async getActions(): Promise<Action[]> {
        return get(this.getId(), `actions`, this.token);
    }


    /**
     * Deletes this network. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    async delete(): Promise<void> {
        try {
            const result = await axios.delete(`${base}/disks/${this.getId()}`, {headers: {Authorization: this.token}});
            if(result.data.error) throw Error(result.data.error);
            return result.data;
        } catch(e){
            if(e.data && e.data.error) throw Error(e.data.error);
            throw Error(e);
        }
    }
}

export interface NetworkConnectResult {
    error?: string,
    type: string,
    ipv6: string,
    action: Action
} 
export interface NetworkDisconnectResult {
    error?: string,
    status: string,
    action: Action
}