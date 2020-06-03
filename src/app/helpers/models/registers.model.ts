export interface RegisterModel {
    _id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    role: string;
    date: Date;
    loggedin: boolean;
    active: boolean;
    family: string;
}
