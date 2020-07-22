import Service from "./Service";
import _Network from "../interfaces/Network";
import Network from "./Network";
import Drive from "./Drive";
import _Drive from "../interfaces/Drive";
import Folder from "./Folder";
import NewServiceSettings from "../interfaces/NewServiceSettings";
import NewNetworkSettings from "../interfaces/NewNetworkSettings";
import NewDriveSettings from "../interfaces/NewDriveSettings";
import NewFolderSettings from "../interfaces/NewFolderSettings";
/**
 * Stacket API client used for interacting with your services
 */
export default class Stacket {
    private token;
    /**
     * @param token Your Stacket API key
     */
    constructor(token: string);
    /**
     * Gets all services that this account has access to.
     */
    getServices(): Promise<Service[]>;
    /**
     * Gets a service by its ID.
     */
    getService(id: string): Promise<Service>;
    /**
     * Creates a new service.
     */
    createService(settings: NewServiceSettings): Promise<Service>;
    /**
     * Gets the private networks that this account has access to.
     */
    getNetworks(): Promise<_Network[]>;
    /**
     * Gets a private network by its ID.
     */
    getNetwork(id: string): Promise<Network>;
    /**
     * Creates a new private network.
     */
    createNetwork(settings: NewNetworkSettings): Promise<Network>;
    /**
     * Gets the virtual disks that this account has access to.
     */
    getDrives(): Promise<_Drive[]>;
    /**
     * Gets a virtual disk given its ID.
     */
    getDrive(id: string): Promise<Drive>;
    /**
     * Creates a new virtual disk.
     */
    createDrive(settings: NewDriveSettings): Promise<Drive>;
    /**
     * Gets all folders that this account owns.
     */
    getFolders(): Promise<Folder[]>;
    /**
     * Gets a folder given its ID.
     */
    getFolder(id: string): Promise<Folder>;
    /**
     * Creates a new folder.
     */
    createFolder(settings: NewFolderSettings): Promise<Folder>;
    /**
     * Verifies that your API key is valid. While this is good practice, it's not required.
     */
    verify(): Promise<unknown>;
}
