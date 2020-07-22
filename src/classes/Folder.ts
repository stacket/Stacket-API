import axios from "Axios";
import { base } from "../config.json";
import Stacket from "./Stacket";
import _Folder from "../interfaces/Folder";
import FolderItem from "../interfaces/FolderItem";
import ParsedFolderItems from "../interfaces/ParsedFolderItems";
import Service from "./Service";
import Network from "./Network";
import Drive from "./Drive";

async function post(id: string, path: string, body: object, token: string) : Promise<any> {
    try {
        const result = await axios.post(`${base}/profile/folders/${id}/${path}`, body, {headers: {Authorization: token}});
        if(result.data.error) throw Error(result.data.error);
        return result.data;
    } catch(e){
        if(e.data && e.data.error) throw Error(e.data.error);
        throw Error(e);
    }
}

/**
 * Represents a folder owned by the User
 */
export default class Folder {
    constructor(private props: _Folder, private token: string){}



    /**
     * Gets the ID of this folder.
     */
    getId(): string {
        return this.props._id;
    }

    /**
     * Gets the name of this folder.
     */
    getName(): string {
        return this.props.name;
    }

    /**
     * Sets the name of this folder.
     */
    async setName(name: string): Promise<_Folder> {
        let _props = this.props;
        _props.name = name;
        return post(this.getId(), "", _props, this.token);
    }

    /**
     * Gets the items of this folder.
     */
    async getItems(): Promise<ParsedFolderItems> {
        const _client = new Stacket(this.token);
        let services: any = [];
        let networks: any = [];
        let disks: any = [];
        await _client.verify().then(() => {
            services = _client.getServices();
            networks = _client.getNetworks();
            disks = _client.getDrives();
        }).catch(console.error);
        let _items: ParsedFolderItems = {
            services: [],
            networks: [],
            disks: []
        };
        this.props.items.forEach(_item => {
            switch(_item.type) {
                case "service": {
                    _items.services.push(services.find((_service: any) => _service.getId() === _item.id));
                }
                case "network": {
                    _items.networks.push(networks.find((_network: any) => _network.getId() === _item.id));
                }
                case "disk": {
                    _items.disks.push(disks.find((_disk: any) => _disk.getId() === _item.id));
                }
            }
        });
        return _items;
    }

    /**
     * Gets the raw items of this folder.
     */
    getRawItems(): FolderItem[] {
        return this.props.items;
    }

    /**
     * Add an item to this folder.
     */
    async addItem(item: FolderItem): Promise<object> {
        let _props: _Folder = this.props;
        _props.items.push(item);
        return post(this.getId(), "", _props, this.token);
    }

    /**
     * Remove an item from this folder.
     */
    async removeItem(item: FolderItem): Promise<object> {
        let _props: _Folder = this.props;
        _props.items = _props.items.filter(_item => _item != item);
        return post(this.getId(), "", _props, this.token);
    }

    /**
     * Deletes this folder. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    async delete(): Promise<void> {
        try {
            const result = await axios.delete(`${base}/folders/${this.props._id}`, {headers: {Authorization: this.token}});
            if(result.data.error) throw Error(result.data.error);
            return result.data;
        } catch(e){
            if(e.data && e.data.error) throw Error(e.data.error);
            throw Error(e);
        }
    }
}