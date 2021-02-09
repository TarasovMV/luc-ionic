export type PageTypeAuthenticate = 'login' | 'reg' | 'auth';

export interface IPageTabsUserReg {
    name: string;
    email: string;
    passwords: {
        password: string;
        repeatPassword: string;
    };
    isPersonalDataAgree: boolean;
}

export interface IPageTabsUserLogin {
    email: string;
    password: string;
}
