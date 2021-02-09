import {Injectable} from '@angular/core';
import {AppConfigService} from '../app-config.service';
import {HttpClient} from '@angular/common/http';
import {IPageTabsUserLogin, IPageTabsUserReg} from '../../../models/page-tabs-login.model';

@Injectable({
    providedIn: 'root'
})
export class ApiUserService {
    private readonly restUrl: string;

    constructor(appConfigService: AppConfigService, private http: HttpClient) {
        this.restUrl = appConfigService.restUrl;
    }

    public async userRegister(data: IPageTabsUserReg): Promise<boolean> {
        const body = {
            login: data?.name,
            email: data?.email,
            password: data?.passwords?.password,
        };
        try {
            await this.http.post(`${this.restUrl}/api/User/register`, body).toPromise();
            return true;
        } catch (e) {
            console.error('userRegister', e);
            return false;
        }
    }

    public async userLogin(data: IPageTabsUserLogin): Promise<boolean> {
        const body = {
            email: data?.email,
            password: data?.password,
        };
        try {
            await this.http.post(`${this.restUrl}/api/User/auth`, body).toPromise();
            return true;
        } catch (e) {
            console.error('userRegister', e);
            return false;
        }
    }
}
