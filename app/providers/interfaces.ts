export interface Member {
    id?: string;
    firstname: string;
    lastname: string;
    username: string;
    DoB: Date;
    email: string;
    phone: string;
    status?: string;
    parentMember?: string;
}