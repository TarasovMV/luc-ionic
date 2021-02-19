import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUserInfo} from '../../models/user-info.model';
import { Storage } from '@ionic/storage';
import {ApiUserService} from './api/api-user.service';
import {AppTokenService} from './app-token.service';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    private readonly userAuthTokenPath: string = 'user-token';

    public authUser$: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo>(null);

    constructor(
        private storage: Storage,
        private apiUserService: ApiUserService,
        private tokenService: AppTokenService,
    ) {
        this.init().then();
    }

    public setUser(user: IUserInfo): void {
        if (!user) {
            return;
        }
        this.authUser$.next({...user});
        if (!!user?.token) {
            this.storage.set(this.userAuthTokenPath, user?.token).then();
            this.tokenService.userToken = user.token;
        }
    }

    public clearUser(): void {
        this.authUser$.next(null);
        this.storage.set(this.userAuthTokenPath, null).then();
        this.tokenService.userToken = null;
    }

    private async init(): Promise<void> {
        const user = await this.getUserFromStorage();
        if (!user) {
            return;
        }
        this.setUser(user);
    }

    private async getUserFromStorage(): Promise<IUserInfo> {
        this.tokenService.userToken = await this.storage.get(this.userAuthTokenPath);
        return await this.apiUserService.userCurrent();
    }
}
