import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUserInfo} from '../../models/user-info.model';
import {ApiUserService} from './api/api-user.service';
import {AppTokenService} from './app-token.service';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    public authUser$: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo>(null);

    constructor(
        private apiUserService: ApiUserService,
        private tokenService: AppTokenService,
    ) {
        // this.tokenService.debugClear();
    }

    public setUser(user: IUserInfo): void {
        if (!user) {
            return;
        }
        this.authUser$.next({...user});
        if (!!user?.token) {
            this.tokenService.userTokenAuth = user.token;
        }
    }

    public clearUser(): void {
        this.authUser$.next(null);
        this.tokenService.userToken = null;
    }

    public async init(): Promise<void> {
        if (!!this.authUser$.getValue()) {
            return;
        }
        const user = await this.getUserFromStorage();
        if (!user || this.isAnonUser(user)) {
            console.log('init', this.tokenService.userToken);
            if (!this.tokenService.userToken) {
                await this.anonymousRegister();
            }
            return;
        }
        this.setUser(user);
    }

    private async getUserFromStorage(): Promise<IUserInfo> {
        return await this.apiUserService.userCurrent();
    }

    private async anonymousRegister(): Promise<void> {
        const anonUser = await this.apiUserService.userAnonymousRegister();
        this.tokenService.userToken = anonUser?.token;
    }

    private isAnonUser = (user: IUserInfo): boolean => {
        return !(!!user?.email || !!user.name);
    }
}
