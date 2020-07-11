import { Type } from "../types/Type";

export default interface NewServiceSettings {
    type: Type,
    version: string,
    platform: string,
    node: string,
    payment?: string,
    package: string,
    coupon?: string,
    team?: string
}