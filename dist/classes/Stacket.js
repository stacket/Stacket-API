"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_json_1 = require("../config.json");
const Service_1 = __importDefault(require("./Service"));
const Network_1 = __importDefault(require("./Network"));
const Drive_1 = __importDefault(require("./Drive"));
const Folder_1 = __importDefault(require("./Folder"));
/**
 * Stacket API client used for interacting with your services
 */
class Stacket {
    /**
     * @param token Your Stacket API key
     */
    constructor(token) {
        this.token = token;
    }
    /**
     * Gets all services that this account has access to.
     */
    async getServices() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.get(`${config_json_1.base}/services/`, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                const services = result.data.map((service) => new Service_1.default(service, this.token));
                resolve(services);
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Gets a service by its ID.
     */
    async getService(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.get(`${config_json_1.base}/services/${id}`, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                const access = result.data.access;
                let service = new Service_1.default(result.data.service, this.token, access);
                resolve(service);
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Creates a new service.
     */
    async createService(settings) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.post(`${config_json_1.base}/services/`, settings, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                resolve(new Service_1.default(result.data, this.token));
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Gets the private networks that this account has access to.
     */
    async getNetworks() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.get(`${config_json_1.base}/networks/`, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                const networks = result.data.map((network) => new Network_1.default(network, this.token));
                resolve(networks);
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Gets a private network by its ID.
     */
    async getNetwork(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.get(`${config_json_1.base}/networks/${id}`, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                const access = result.data.access;
                const network = new Network_1.default(result.data.network, this.token, access);
                resolve(network);
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Creates a new private network.
     */
    async createNetwork(settings) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.post(`${config_json_1.base}/networks/`, settings, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                resolve(new Network_1.default(result.data, this.token));
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Gets the virtual disks that this account has access to.
     */
    async getDrives() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.get(`${config_json_1.base}/disks/`, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                const disks = result.data.map((disk) => new Drive_1.default(disk, this.token));
                resolve(disks);
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Gets a virtual disk given its ID.
     */
    async getDrive(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.get(`${config_json_1.base}/disks/${id}`, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                const access = result.data.access;
                const disk = new Drive_1.default(result.data.disk, this.token, access);
                resolve(disk);
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Creates a new virtual disk.
     */
    async createDrive(settings) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.post(`${config_json_1.base}/disks/`, settings, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                resolve(new Drive_1.default(result.data, this.token));
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Gets all folders that this account owns.
     */
    async getFolders() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.get(`${config_json_1.base}/profile/folders/`, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                const folders = result.data.map((folder) => new Folder_1.default(folder, this.token));
                resolve(folders);
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Gets a folder given its ID.
     */
    async getFolder(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.get(`${config_json_1.base}/profile/folders/${id}`, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                const disk = new Folder_1.default(result.data, this.token);
                resolve(disk);
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
            ;
        });
    }
    /**
     * Creates a new folder.
     */
    async createFolder(settings) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.post(`${config_json_1.base}/profile/folders/`, settings, { headers: { Authorization: this.token } });
                if (result.data.error)
                    return reject(result.data.error);
                resolve(new Folder_1.default(result.data, this.token));
            }
            catch (e) {
                if (e.data && e.data.error)
                    return reject(e.data.error);
                reject(e);
            }
        });
    }
    /**
     * Verifies that your API key is valid. While this is good practice, it's not required.
     */
    async verify() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios_1.default.post(`${config_json_1.base}/auth/verify`, { token: this.token });
                if (result.data.state === "verified")
                    return resolve();
                if (result.data.error)
                    return reject(result.data.error);
                reject(null);
            }
            catch (e) {
                reject(e);
            }
            ;
        });
    }
}
exports.default = Stacket;
