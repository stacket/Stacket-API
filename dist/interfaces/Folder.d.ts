import FolderItem from "./FolderItem";
export default interface Folder {
    _id: string;
    user: string;
    name: string;
    items: FolderItem[];
}
