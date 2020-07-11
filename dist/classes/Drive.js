"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_json_1 = require("../config.json");
const Service_1 = __importDefault(require("./Service"));
async function get(id, path, token) {
    try {
        const result = await axios_1.default.get(`${config_json_1.base}/disks/${id}/${path}`, { headers: { Authorization: token } });
        if (result.data.error)
            throw Error(result.data.error);
        return result.data;
    }
    catch (e) {
        if (e.data && e.data.error)
            throw Error(e.data.error);
        throw Error(e);
    }
}
async function post(id, path, body, token) {
    try {
        const result = await axios_1.default.post(`${config_json_1.base}/disks/${id}/${path}`, body, { headers: { Authorization: token } });
        if (result.data.error)
            throw Error(result.data.error);
        return result.data;
    }
    catch (e) {
        if (e.data && e.data.error)
            throw Error(e.data.error);
        throw Error(e);
    }
}
/**
 * Represents a Stacket virtual disk.
 */
class Drive {
    constructor(props, token, access) {
        this.props = props;
        this.token = token;
        this.access = access;
    }
    /**
     * Gets the ID of this virtual disk..
     */
    getId() {
        return this.props._id;
    }
    /**
     * Gets the name of this virtual disk..
     */
    getName() {
        return this.props.name;
    }
    /**
     * Gets the access information of this disk.
     */
    async getAccess() {
        return new Promise(async (resolve, reject) => {
            if (this.access)
                return resolve(this.access);
            const data = await get(this.getId(), "", this.token);
            const access = data.access;
            this.access = access;
            resolve(access);
        });
    }
    /**
     * Gets the size of this virtual disk.
     */
    getSize() {
        return this.props.size;
    }
    /**
     * Gets the usage of this virtual disk.
     */
    getUsed() {
        return this.props.used;
    }
    /**
     * Gets the team ID of this network, if it's owned by a team. For personal networks, this will return null.
     */
    getTeamId() {
        return this.props.team ? this.props.team.id : null;
    }
    /**
     * Gets the subusers of this virtual disk.
     */
    getSubusers() {
        return this.props.subusers;
    }
    /**
     * Connects this virtual disk to a service.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    async connect(service, diskPath, servicePath) {
        const id = service instanceof Service_1.default ? service.getId() : service;
        return post(this.getId(), `connect/${id}`, { path: { "disk": diskPath, "service": servicePath } }, this.token);
    }
    /**
     * Disconnects this virtual disk from a service.
     * @returns {Promise<NetworkDisconnectResult>} The result of the request
     */
    async disconnect(service) {
        const id = service instanceof Service_1.default ? service.getId() : service;
        return get(this.getId(), `disconnect/${id}`, this.token);
    }
    /**
     * Sets the size (in gigabytes) of this virtual disk.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    async setSize(size) {
        return post(this.getId(), ``, { size }, this.token);
    }
    /**
    * Re-names this virtual disk.
    * @returns {Promise<NetworkConnectResult>} The result of the request
    */
    async setName(name) {
        return post(this.getId(), ``, { name }, this.token);
    }
    /**
     * Gets the full history of all actions ever performed on this virtual disk.
     * @returns {Promise<Action[]>} All actions ever performed on this virtual disk
     */
    async getActions() {
        return get(this.getId(), `actions`, this.token);
    }
    /**
     * Deletes this network. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    async delete() {
        try {
            const result = await axios_1.default.delete(`${config_json_1.base}/disks/${this.getId()}`, { headers: { Authorization: this.token } });
            if (result.data.error)
                throw Error(result.data.error);
            return result.data;
        }
        catch (e) {
            if (e.data && e.data.error)
                throw Error(e.data.error);
            throw Error(e);
        }
    }
}
exports.default = Drive;
