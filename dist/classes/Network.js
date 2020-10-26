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
        const result = await axios_1.default.get(`${config_json_1.base}/networks/${id}/${path}`, { headers: { Authorization: token } });
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
 * Represents a Stacket network
 */
class Network {
    constructor(props, token, access) {
        this.props = props;
        this.token = token;
        this.access = access;
    }
    /**
     * Gets the ID of this network.
     */
    getId() {
        return this.props._id;
    }
    /**
     * Gets the name of this network.
     */
    getName() {
        return this.props.name;
    }
    /**
     * Gets the access information of this network.
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
     * Gets the type of this network.
     */
    getType() {
        return this.props.type;
    }
    /**
     * Gets the IP address of this network.
     */
    getIP() {
        return this.props.ip;
    }
    /**
     * Gets the team ID of this network, if it's owned by a team. For personal networks, this will return null.
     */
    getTeamId() {
        return this.props.team.id || null;
    }
    /**
     * Gets the internal Network ID of this network.
     */
    getNetworkId() {
        return this.props.networkId;
    }
    /**
     * Connects a service to a network.
     * @returns {Promise<NetworkConnectResult>} The result of the request
     */
    async connect(service) {
        const id = service instanceof Service_1.default ? service.getId() : service;
        return get(this.getId(), `connect/${id}`, this.token);
    }
    /**
     * Disconnects this service from a network.
     * @returns {Promise<NetworkDisconnectResult>} The result of the request
     */
    async disconnect(service) {
        const id = service instanceof Service_1.default ? service.getId() : service;
        return get(this.getId(), `disconnect/${id}`, this.token);
    }
    /**
     * Deletes this network. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    async delete() {
        try {
            const result = await axios_1.default.delete(`${config_json_1.base}/networks/${this.getId()}`, { headers: { Authorization: this.token } });
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
exports.default = Network;
