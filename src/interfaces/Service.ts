import { Type } from "../types/Type";
import Allocation from "./Allocation";
import { ServiceNetwork } from "./Network";
import { Status } from "../types/Status";
import { Payment } from "../types/Payment";
import Subuser from "./Subuser";
import User from "./User";
import Disk from "./Disk";
import Settings from "./Settings";

export default interface Service {
    _id: string,
    name: string,
	type: Type,
	version: string,
	allocations: Allocation[],
	networks: ServiceNetwork[],
    node: string,
    storage: string,
    package: string,
    docker: string,
    status: Status
    payment: Payment,
    subusers: Subuser[],
    environment: object,
    owner: User,
	disks: Disk[],
    settings: Settings
    team?: {
        id: string
    }
}