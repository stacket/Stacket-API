export default interface ServiceUpdateBody {
    version?: {
        platform: string,
        version: string
    },
    package?: string,
    name?: string,
    settings?: {
        autorestart?: boolean,
        firmware?: string
    },
    environment?: {
        key: string,
        value: any
    },
    allocation?: {
        id?: string,
        delete?: boolean,
        disabled?: boolean,
        udp?: boolean,
        ip?: string,
        public?: string,
        target?: string
    }
}