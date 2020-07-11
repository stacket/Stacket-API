export default interface Invoice {
    _id: string,
    user: string,
    date: number,
    lastCheck: number,
    services: InvoiceService[],
    disks: InvoiceDisk[]
}

export interface InvoiceService {
    id: string,
    hours: number,
    amount: number,
    lastCheck: number
}

export interface InvoiceDisk {
    id: string,
    hours: number,
    amount: number,
    lastCheck: number    
}