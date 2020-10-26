"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_json_1 = require("../config.json");
const Stacket_1 = __importDefault(require("./Stacket"));
async function post(id, path, body, token) {
    try {
        const result = await axios_1.default.post(`${config_json_1.base}/profile/folders/${id}/${path}`, body, { headers: { Authorization: token } });
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
 * Represents a folder owned by the User
 */
class Folder {
    constructor(props, token) {
        this.props = props;
        this.token = token;
    }
    /**
     * Gets the ID of this folder.
     */
    getId() {
        return this.props._id;
    }
    /**
     * Gets the name of this folder.
     */
    getName() {
        return this.props.name;
    }
    /**
     * Gets the folder top color.
     */
    getTopColor() {
        return this.props.color.top;
    }
    /**
     * Gets the folder bottom color.
     */
    getBottomColor() {
        return this.props.color.bottom;
    }
    /**
     * Sets the name of this folder.
     */
    async setName(name) {
        let _props = this.props;
        _props.name = name;
        return post(this.getId(), "", _props, this.token);
    }
    /**
     * Gets the items of this folder.
     */
    async getItems() {
        const _client = new Stacket_1.default(this.token);
        let services = [];
        let networks = [];
        let disks = [];
        await _client.verify().then(() => {
            services = _client.getServices();
            networks = _client.getNetworks();
            disks = _client.getDrives();
        }).catch(console.error);
        let _items = {
            services: [],
            networks: [],
            disks: []
        };
        this.props.items.forEach(_item => {
            switch (_item.type) {
                case "service": {
                    _items.services.push(services.find((_service) => _service.getId() === _item.id));
                }
                case "network": {
                    _items.networks.push(networks.find((_network) => _network.getId() === _item.id));
                }
                case "disk": {
                    _items.disks.push(disks.find((_disk) => _disk.getId() === _item.id));
                }
            }
        });
        return _items;
    }
    /**
     * Gets the raw items of this folder.
     */
    getRawItems() {
        return this.props.items;
    }
    /**
     * Add an item to this folder.
     */
    async addItem(item) {
        let _props = this.props;
        _props.items.push(item);
        return post(this.getId(), "", _props, this.token);
    }
    /**
     * Remove an item from this folder.
     */
    async removeItem(item) {
        let _props = this.props;
        _props.items = _props.items.filter(_item => _item != item);
        return post(this.getId(), "", _props, this.token);
    }
    /**
     * Deletes this folder. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    async delete() {
        try {
            const result = await axios_1.default.delete(`${config_json_1.base}/folders/${this.props._id}`, { headers: { Authorization: this.token } });
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
exports.default = Folder;
