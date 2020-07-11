import { Permission } from "../types/Permission";
export default interface Group {
    _id: string;
    name: string;
    team: string;
    permissions: Permission[];
}
