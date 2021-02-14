import {Injectable} from '@angular/core';
import {AppConfigService} from '../app-config.service';
import {HttpClient} from '@angular/common/http';
import { IPageTabsUserLogin, IPageTabsUserReg} from '../../../models/page-tabs-login.model';
import {LoggerService} from '../logger.service';
import {IUserInfo} from '../../../models/user-info.model';

@Injectable({
    providedIn: 'root'
})
export class ApiUserService {
    private readonly restUrl: string;

    constructor(
        appConfigService: AppConfigService,
        private http: HttpClient,
        private loggerService: LoggerService,
    ) {
        this.restUrl = appConfigService.restUrl;
    }

    public async userRegister(data: IPageTabsUserReg): Promise<IUserInfo> {
        const body = {
            name: data?.name,
            email: data?.email,
            password: data?.passwords?.password,
        };
        try {
            return await this.http.post<IUserInfo>(`${this.restUrl}/api/User/register`, body).toPromise();
        } catch (e) {
            console.error('userRegister', e);
            return null;
        }
    }

    public async userLogin(data: IPageTabsUserLogin): Promise<IUserInfo> {
        const body = {
            email: data?.email,
            password: data?.password,
        };
        try {
            return await this.http.post<IUserInfo>(`${this.restUrl}/api/User/auth`, body).toPromise();
        } catch (e) {
            console.error('userRegister', e);
            return null;
        }
    }

    public async userCurrent(): Promise<IUserInfo> {
        try {
            return await this.http.get<IUserInfo>(`${this.restUrl}/api/User/current`).toPromise();
        } catch (e) {
            console.error('userCurrent', e);
            return null;
        }
    }
}
