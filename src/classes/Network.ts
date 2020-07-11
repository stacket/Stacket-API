import axios from "axios";
import Action from "../interfaces/Action";
import _Network from "../interfaces/Network";
import { base } from "../config.json";
import Service from "./Service";
import Access from "../interfaces/Access";

async function get(id: string, path: string, token: string) : Promise<any> {
    try {
        const result = await axios.get(`${base}/networks/${id}/${path}`, {headers: {Authorization: token}});
        if(result.data.error) throw Error(result.data.error);
        return result.data;
    } catch(e){
        if(e.data && e.data.error) throw Error(e.data.error);
        throw Error(e);
    }
}

/**
 * Represents a Stacket network
 */
export default class Network {
    constructor(private props: _Network, private token: string, private access?: Access){}



    /**
     * Gets the ID of this network.
     */
    getId(): string {
        return this.props._id;
    }

    /**
     * Gets the name of this network.
     */
    getName(): string {
        return this.props.name;
    }

    /**
     * Gets the access information of this network.
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
     * Gets the type of this network.
     */
    getType(): "ipv4" | "ipv6" {
        return this.props.type;
    }

    /**
     * Gets the IP address of this network.
     */
    getIP(): string {
        return this.props.ip;
    }

    /**
     * Gets the team ID of this network, if it's owned by a team. For personal networks, this will return null.
     */
    getTeamId(): string | null {
        return this.props.team.id || null;
    }

    /**
     * Gets the internal Network ID of this network.
     */
    getNetworkId(): string {
        return this.props.networkId;
    }

    /**
     * Connects a service to a network.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    async connect(service: string | Service): Promise<NetworkConnectResult> {
        const id = service instanceof Service ? service.getId() : service;
        return get(this.getId(), `connect/${id}`, this.token);
    }

    /**
     * Powers this service off.
     * @returns {Promise<NetworkDisconnectResult>} The result of the request
     */
    async disconnect(service: string | Service): Promise<NetworkConnectResult> {
        const id = service instanceof Service ? service.getId() : service;
        return get(this.getId(), `disconnect/${id}`, this.token);
    }


    /**
     * Deletes this network. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    async delete(): Promise<void> {
        try {
            const result = await axios.delete(`${base}/networks/${this.getId()}`, {headers: {Authorization: this.token}});
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