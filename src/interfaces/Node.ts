export default interface Node {
    _id: string,
    name: string,
    node: string,
    ip: string,
    team: {
        id: string
    }
}