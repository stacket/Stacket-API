export default interface Team {
    _id: string;
    name: string;
    owner: string;
    image: string;
    /**
     * Members of this team, formatted {userId: groupId}
     */
    members: {
        [userId: string]: string;
    };
}
