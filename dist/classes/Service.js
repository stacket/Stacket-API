"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_json_1 = require("../config.json");
async function control(id, state, token) {
    try {
        const result = await axios_1.default.post(`${config_json_1.base}/services/${id}/control`, { state: state }, { headers: { Authorization: token } });
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
async function get(id, path, token) {
    try {
        const result = await axios_1.default.get(`${config_json_1.base}/services/${id}/${path}`, { headers: { Authorization: token } });
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
        const result = await axios_1.default.post(`${config_json_1.base}/services/${id}/${path}`, body, { headers: { Authorization: token } });
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
async function _delete(id, path, token) {
    try {
        const result = await axios_1.default.delete(`${config_json_1.base}/services/${id}/${path}`, { headers: { Authorization: token } });
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
class Service {
    constructor(props, token, access) {
        this.props = props;
        this.token = token;
        this.access = access;
    }
    /**
     * Gets the ID of this service.
     */
    getId() {
        return this.props._id;
    }
    /**
     * Gets the name of this service.
     */
    getName() {
        return this.props.name;
    }
    /**
     * Gets the access information of this service.
     */
    async getAccess() {
        return new Promise(async (resolve, reject) => {
            if (this.access)
                return resolve(this.access);
            try {
                const data = await get(this.getId(), "", this.token);
                const access = data.access;
                this.access = access;
                resolve(access);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Gets the type of this service.
     */
    getType() {
        return this.props.type;
    }
    /**
     * Gets the version of this service.
     */
    getVersion() {
        return this.props.version;
    }
    /**
     * Gets the allocations of this service.
     */
    getAllocations() {
        return this.props.allocations;
    }
    /**
     * Gets the networks this service is connected to.
     */
    getNetworks() {
        return this.props.networks;
    }
    /**
     * Gets the node this service is hosted on.
     */
    getNode() {
        return this.props.node;
    }
    /**
     * Gets the storage server of this service.
     */
    getStorage() {
        return this.props.storage;
    }
    /**
     * Gets the package of this service.
     */
    getPackage() {
        return this.props.package;
    }
    /**
     * Gets the status of this service.
     */
    getStatus() {
        return this.props.status;
    }
    /**
     * Gets the payment interval for this service.
     */
    getPayment() {
        return this.props.payment;
    }
    /**
     * Gets the subusers of this service.
     */
    getSubusers() {
        return this.props.subusers;
    }
    /**
     * Gets the environment of this service.
     */
    getEnvironment() {
        return this.props.environment;
    }
    /**
     * Gets the owner of this service.
     */
    getOwner() {
        return this.props.owner;
    }
    /**
     * Gets the virtual disks mounted to this service.
     */
    getDisk() {
        return this.props.disks;
    }
    /**
     * Gets the settings of this service.
     */
    getSettings() {
        return this.props.settings;
    }
    /**
     * Gets the team ID of this service, if it's owned by a team. For personal services, this will return null.
     */
    getTeamId() {
        return (this.props.team ? this.props.team.id : null);
    }
    /**
     * Powers this service on.
     * @returns {Promise<Action>} The result of the request
     */
    async powerOn() {
        return control(this.props._id, "start", this.token);
    }
    /**
     * Powers this service off.
     * @returns {Promise<Action>} The result of the request
     */
    async powerOff() {
        return control(this.props._id, "stop", this.token);
    }
    /**
     * Kills this service.
     * @returns {Promise<Action>} The result of the request
     */
    async kill() {
        return control(this.props._id, "kill", this.token);
    }
    /**
     * Activates this service to wake it up from hibernation.
     * @returns {Promise<Action>} The result of the request
     */
    async activate() {
        return control(this.props._id, "activate", this.token);
    }
    /**
     * Hibernates and then activates your service again. Your service must be `offline` or `hibernated` to use this.
     * @returns {Promise<Action>} The result of the request
     */
    async reactivate() {
        return control(this.props._id, "reactivate", this.token);
    }
    /**
     * Hibernates this service.
     * @returns {Promise<Action>} The result of the request
     */
    async hibernate() {
        return control(this.props._id, "hibernate", this.token);
    }
    /**
     * Services such as CSGO will run update action as steamcmd update.
     * @returns {Promise<Action>} The result of the request
     */
    async update() {
        return control(this.props._id, "update", this.token);
    }
    /**
     * Automatically installs all node modules your Node.js service depends on from your `package.json` file.
     * @returns {Promise<Action>} The result of the request
     */
    async npminstall() {
        return control(this.props._id, "npminstall", this.token);
    }
    /**
     * Gets the current CPU, RAM and Disk usage of this service.
     * @returns {Promise<Usage>} This service's resource usage
     */
    async getUsage() {
        return get(this.props._id, "usage", this.token);
    }
    /**
     * Gets the full history of all actions ever performed on this service.
     * @returns {Promise<Action[]>} All actions ever performed on this service
     */
    async getActions() {
        return get(this.props._id, "actions", this.token);
    }
    /**
     * Gets an action performed on this service given its ID.
     * @returns {Promise<Action>} The result of the request
     */
    async getAction(id) {
        return get(this.props._id, `actions/${id}`, this.token);
    }
    /**
     * Deletes this service. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    async delete() {
        try {
            const result = await axios_1.default.delete(`${config_json_1.base}/services/${this.props._id}`, { headers: { Authorization: this.token } });
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
     * Re-names this service.
     */
    async setName(name) {
        return post(this.getId(), "", { name }, this.token);
    }
    /**
     * Changes the version this service.
     */
    async setVersion(platform, version) {
        return post(this.getId(), "", { version: { platform, version } }, this.token);
    }
    /**
     * Changes the package this service.
     */
    async setPackage(_package) {
        return post(this.getId(), "", { "package": _package }, this.token);
    }
    /**
     * Sets whether this service will auto restart on crash or not.
     */
    async setAutoRestart(enabled) {
        return post(this.getId(), "", { settings: { autorestart: enabled } }, this.token);
    }
    /**
     * Sets the firmware of this service.
     */
    async setFirmware(firmware) {
        return post(this.getId(), "", { settings: { firmware } }, this.token);
    }
    /**
     * Changes the value of an environment variable on this service.
     */
    async setEnvironment(key, value) {
        return post(this.getId(), "", { environment: { key, value } }, this.token);
    }
    /**
     * Modifies an existing allocation on this service.
     */
    async editAllocation(id, ip, _public, target, udp, disabled) {
        const updateObject = { id };
        if (ip)
            updateObject.ip = ip;
        if (_public)
            updateObject._public = _public;
        if (target)
            updateObject.target = target;
        if (udp)
            updateObject.udp = udp;
        if (disabled)
            updateObject.disabled = disabled;
        return post(this.getId(), "", { allocation: updateObject }, this.token);
    }
    /**
     * Disables an existing allocation on this service.
     */
    async disableAllocation(id) {
        return post(this.getId(), "", { allocation: { id, "disabled": true } }, this.token);
    }
    /**
     * Deletes an allocation from this service.
     */
    async deleteAllocation(id) {
        return post(this.getId(), "", { allocation: { id, delete: true } }, this.token);
    }
    /**
     * Adds a new allocation to this service.
     */
    async addAllocation(disabled, ip, _public, target, udp) {
        return post(this.getId(), "", { allocation: { disabled, ip, "public": _public, target, udp } }, this.token);
    }
    /**
     * Gets all FTP logins for this service.
     */
    async getFTP() {
        return get(this.getId(), "ftp", this.token);
    }
    /**
     * Creates a new FTP login for this service.
     */
    async newFTP(name, password, path) {
        return post(this.getId(), "ftp", { name, password, path }, this.token);
    }
    /**
     * Edits an FTP login for this service.
     */
    async editFTP(id, settings) {
        const { name, password, path } = settings;
        const updateObject = { id };
        if (name)
            updateObject.name = name;
        if (password)
            updateObject.password = password;
        if (path)
            updateObject.path = path;
        return post(this.getId(), "ftp", updateObject, this.token);
    }
    /**
     * Deletes an FTP login from this service.
     */
    async deleteFTP(id) {
        return _delete(this.getId(), `ftp/${id}`, this.token);
    }
    /**
     * Bulk update this service.
     */
    async bulkUpdate(body) {
        return post(this.getId(), "", body, this.token);
    }
}
exports.default = Service;
