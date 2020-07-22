import _Folder from "../interfaces/Folder";
import FolderItem from "../interfaces/FolderItem";
import ParsedFolderItems from "../interfaces/ParsedFolderItems";
/**
 * Represents a folder owned by the User
 */
export default class Folder {
    private props;
    private token;
    constructor(props: _Folder, token: string);
    /**
     * Gets the ID of this folder.
     */
    getId(): string;
    /**
     * Gets the name of this folder.
     */
    getName(): string;
    /**
     * Sets the name of this folder.
     */
    setName(name: string): Promise<_Folder>;
    /**
     * Gets the items of this folder.
     */
    getItems(): Promise<ParsedFolderItems>;
    /**
     * Gets the raw items of this folder.
     */
    getRawItems(): FolderItem[];
    /**
     * Add an item to this folder.
     */
    addItem(item: FolderItem): Promise<object>;
    /**
     * Remove an item from this folder.
     */
    removeItem(item: FolderItem): Promise<object>;
    /**
     * Deletes this folder. **Cannot be undone.**
     * @returns {Promise<void>} The result of the request
     */
    delete(): Promise<void>;
}
