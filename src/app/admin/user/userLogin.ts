export interface UserLogin {
    id: number;
    firstname?: string;
    lastname?: string;
    email: string;
    password: string;
    token?: string;
    role?: string;
}