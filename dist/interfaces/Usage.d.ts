/**
 * Resource usage of a service
 */
export default interface Usage {
    disk: {
        usage: number;
        total: number;
    };
    cpu: {
        usage: number;
    };
    memory: {
        usage: number;
        total: number;
    };
}
