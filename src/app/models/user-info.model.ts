export interface IUserInfo {
    id: number;
    name: string;
    email: string;
    gender?: string;
    city?: string;
    age?: number;
    token: string;
    registeredAt: Date;
    lastLoginAt: Date;
}
