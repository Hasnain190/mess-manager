export interface User {
    id: number;
    username: string;
    email: string;
    room: number;
    hostel: string;
    phone: string;
    security_fee: string;
    isAdmin: boolean;

}


export interface UserInfo {

    refresh: string,
    access: string,
    id: number,
    username: string,
    isAdmin: boolean,
    email: string,
    phone: string,
    room: number,
    hostel: string,
    token: string,
    security_fee: number
}
export interface UserLogin {
    error?: string | null | unknown,
    loading?: boolean,
    userInfo?: UserInfo | null
}

