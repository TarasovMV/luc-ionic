export interface IUserInfo {
    id: number;
    anonymousId?: string;
    name: string;
    email: string;
    gender?: UserInfoGender;
    city?: string;
    age?: number;
    token: string;
    registeredAt: Date;
    lastLoginAt: Date;
}

export type UserInfoGender = 'male' | 'female';
