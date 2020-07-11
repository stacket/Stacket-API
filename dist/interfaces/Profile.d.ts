export default interface Profile {
    _id: string;
    fullname: string;
    email: string;
    password: string;
    company: string;
    country: string;
    image: string;
    balance: number;
    role: "customer" | "supporter" | "developer";
    starred: string[];
    stripe: string;
}
