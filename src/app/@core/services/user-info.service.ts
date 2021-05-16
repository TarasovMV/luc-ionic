import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUserInfo, UserInfoGender} from '../../models/user-info.model';
import {ApiUserService} from './api/api-user.service';
import {AppTokenService} from './app-token.service';
import {Storage} from '@ionic/storage';
import {IArticle} from '../../models/article.model';
import {ApiFileService} from './api/api-file.service';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    private readonly initialGenderPath: string = 'initial-gender';
    public readonly genderReference: {[key in UserInfoGender]: string} = {
        male: 'Мужской',
        female: 'Женский',
    };

    public authUser$: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo>(null);

    constructor(
        private apiUserService: ApiUserService,
        private apiFileService: ApiFileService,
        private tokenService: AppTokenService,
        private storage: Storage,
    ) {
        // this.tokenService.debugClear();
    }

    public async getAllArticles(): Promise<IArticle[]> {
        const articles = await this.apiUserService.getAllArticles();
        articles
            .map(x => x.jsonContent)
            .map(x => x.blocks)
            .forEach(x => x.filter(k => k.type === 'photo').forEach(k => k.urls = k.urls.map(u => this.apiFileService.getArticlePhoto(u))));
        articles.forEach(x => {
            x.title = x.jsonContent.title;
            x.imageUrl = x.jsonContent.blocks.find(b => b.type === 'photo').urls[0];
        });
        return articles;
    }

    public async setInitialGender(value: UserInfoGender) {
        value = value ?? 'female';
        await this.storage.set(this.initialGenderPath, value);
    }
    public async getInitialGender(): Promise<UserInfoGender> {
        const value = await this.storage.get(this.initialGenderPath);
        return value ?? 'female';
    }

    public async updateUser(user: IUserInfo): Promise<IUserInfo> {
        let res = await this.apiUserService.userUpdate(user);
        res = res ?? {...this.authUser$.getValue()};
        this.authUser$.next(res);
        return res;
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
        const gender = await this.getInitialGender();
        const anonUser = await this.apiUserService.userAnonymousRegister(gender, null);
        if (!anonUser) {
            return;
        }
        this.tokenService.userToken = anonUser?.token;
    }

    private isAnonUser = (user: IUserInfo): boolean => {
        return !(!!user?.email || !!user.name);
    }
}
