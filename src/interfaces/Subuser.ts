import Allocation from "./Allocation";
import { Permission } from "../types/Permission";

export default interface Subuser {
    user: string,
	permissions: Permission[],
}