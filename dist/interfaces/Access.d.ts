import { Permission } from "../types/Permission";
export default interface Access {
    type: "owner" | "subuser" | "team" | "staff";
    permissions: Permission[];
}
