import Service from "../classes/Service";
import Network from "../classes/Network";
import Drive from "../classes/Drive";

export default interface ParsedFolderItems {
    services: Service[],
    networks: Network[],
    disks: Drive[]
}