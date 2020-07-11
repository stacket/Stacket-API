import axios from "axios";
import Access from "../interfaces/Access";

import { base } from "../config.json";
import { Type } from "../types/Type";

import Service from "./Service";
import _Service from "../interfaces/Service";

import _Network from "../interfaces/Network";
import Network from "./Network";

import Drive from "./Drive";
import _Drive from "../interfaces/Drive";

import NewServiceSettings from "../interfaces/NewServiceSettings";
import NewNetworkSettings from "../interfaces/NewNetworkSettings";
import NewDriveSettings from "../interfaces/NewDriveSettings";

/**
 * Stacket API client used for interacting with your services
 */
export default class Stacket {
    /**
     * @param token Your Stacket API key
     */
    constructor(private token: string){}

    /**
     * Gets all services that this account has access to.
     */
    async getServices(): Promise<Service[]> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.get(`${base}/services/`, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);
                
                const services = result.data.map((service: _Service) => new Service(service, this.token));

                resolve(services);
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Gets a service by its ID.
     */
    async getService(id: string): Promise<Service> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.get(`${base}/services/${id}`, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);

                const access: Access = result.data.access;
                let service = new Service(result.data.service, this.token, access);


                resolve(service);
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Creates a new service.
     */
    async createService(settings: NewServiceSettings): Promise<Service> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.post(`${base}/services/`, settings, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);

                resolve(new Service(result.data, this.token));
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Gets the private networks that this account has access to.
     */
    async getNetworks(): Promise<_Network[]> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.get(`${base}/networks/`, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);
                
                const networks = result.data.map((network: _Network) => new Network(network, this.token));

                resolve(networks);
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Gets a private network by its ID.
     */
    async getNetwork(id: string): Promise<Network> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.get(`${base}/networks/${id}`, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);
                
                const access: Access = result.data.access;
                const network: Network = new Network(result.data.network, this.token, access);

                resolve(network);
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Creates a new private network.
     */
    async createNetwork(settings: NewNetworkSettings): Promise<Network> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.post(`${base}/networks/`, settings, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);

                resolve(new Network(result.data, this.token));
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Gets the virtual disks that this account has access to.
     */
    async getDrives(): Promise<_Drive[]> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.get(`${base}/disks/`, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);
                
                const disks = result.data.map((disk: _Drive) => new Drive(disk, this.token));

                resolve(disks);
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Gets a virtual disk given its ID.
     */
    async getDrive(id: string): Promise<Drive> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.get(`${base}/disks/${id}`, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);
                
                const access: Access = result.data.access;
                const disk: Drive = new Drive(result.data.network, this.token, access);

                resolve(disk);
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Creates a new private network.
     */
    async createDrive(settings: NewDriveSettings): Promise<Drive> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.post(`${base}/disks/`, settings, {headers: {Authorization: this.token}});
                if(result.data.error) return reject(result.data.error);

                resolve(new Drive(result.data, this.token));
            } catch(e){
                if(e.data && e.data.error) return reject(e.data.error);
                reject(e);
            };
        });
    }

    /**
     * Verifies that your API key is valid. While this is good practice, it's not required.
     */
    async verify(){
        return new Promise(async (resolve: any, reject: any) => {
            try {
                let result = await axios.post(`${base}/auth/verify`, {token: this.token});
                if(result.data.state === "verified") return resolve();
                if(result.data.error) return reject(result.data.error);
                reject(null);
            } catch(e){
                reject(e);
            };
        });
    }
}