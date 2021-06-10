import {Injectable} from '@angular/core';
import {AppConfigService} from '../platform/app-config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { IPageTabsUserLogin, IPageTabsUserReg} from '../../../models/page-tabs-login.model';
import {LoggerService} from '../logger.service';
import {IUserInfo, UserInfoGender} from '../../../models/user-info.model';
import {IFeedback, IFeedbackTheme} from '../../../models/feedback.model';
import {IFavoritesResponse} from '../../../models/favorites.model';
import {IArticle} from '../../../models/article.model';
import {IStartScreenReco} from '../../../models/recognition.model';

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

    public async userAnonymousRegister(gender: UserInfoGender, birthdate: Date, selectedRecommendations: {id: number}[]): Promise<IUserInfo> {
        const body = {
            gender,
            birthdate,
            selectedRecommendations,
        };
        try {
            return await this.http.post<IUserInfo>(`${this.restUrl}/api/User/register/anonymous`, body).toPromise();
        } catch (e) {
            console.error('userAnonymousRegister', JSON.stringify(e));
            return null;
        }
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
            console.error('userRegister', JSON.stringify(e));
            return null;
        }
    }

    public async userUpdate(body: IUserInfo): Promise<IUserInfo> {
        try {
            return await this.http.put<IUserInfo>(`${this.restUrl}/api/User`, body).toPromise();
        } catch (e) {
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
            console.error('userLogin', JSON.stringify(e));
            return null;
        }
    }

    public async userGoogle(body: {googleOAuthToken: string, email: string}): Promise<IUserInfo> {
        try {
            return await this.http.post<IUserInfo>(`${this.restUrl}/api/User/auth/google`, body).toPromise();
        } catch (e) {
            console.error('userGoogle', JSON.stringify(e));
            return null;
        }
    }

    public async userVk(token: string): Promise<IUserInfo> {
        const body = {
            vkOAuthToken: token,
        };
        try {
            return await this.http.post<IUserInfo>(`${this.restUrl}/api/User/auth/vk`, body).toPromise();
        } catch (e) {
            console.error('userVk', JSON.stringify(e));
            return null;
        }
    }

    public async userCurrent(): Promise<IUserInfo> {
        try {
            return await this.http.get<IUserInfo>(`${this.restUrl}/api/User/current`).toPromise();
        } catch (e) {
            console.error('userCurrent', JSON.stringify(e));
            return null;
        }
    }

    public async sendReport(feedback: IFeedback): Promise<boolean> {
        try {
            await this.http.post<unknown>(`${this.restUrl}/api/Feedback`, feedback).toPromise();
            return true;
        } catch (e) {
            console.error('sendReport', e);
            return false;
        }
    }

    public async getReportReference(): Promise<IFeedbackTheme[]> {
        try {
            return await this.http.get<IFeedbackTheme[]>(`${this.restUrl}/api/Feedback/categories`).toPromise();
        } catch (e) {
            console.error('getReportReference', e);
            return [];
        }
    }

    public async getFavorites(): Promise<IFavoritesResponse[]> {
        try {
            return await this.http.get<IFavoritesResponse[]>(`${this.restUrl}/api/Favourites`).toPromise();
        } catch (e) {
            console.error('getFavorites', e);
            return null;
        }
    }

    public async addFavorites(feedId: number): Promise<IFavoritesResponse> {
        return await this.http.post<IFavoritesResponse>(`${this.restUrl}/api/Favourites`, {feedId}).toPromise();
    }

    public async deleteFavorites(feedId: number): Promise<unknown> {
        return await this.http.delete<unknown>(`${this.restUrl}/api/Favourites/${feedId}`).toPromise();
    }

    public async getAllArticles(): Promise<IArticle[]> {
        try {
            return await this.http.get<IArticle[]>(`${this.restUrl}/api/Articles/all`).toPromise();
        } catch (e) {
            console.error('getAllArticles', e);
            return [];
        }
    }

    public async dropPassword(email: string): Promise<boolean> {
        const body = {
            email,
        };
        try {
            await this.http.post(`${this.restUrl}/api/Password/reset-via-email`, body, {responseType: 'text'}).toPromise();
            return true;
        } catch (e) {
            console.error('dropPassword', e);
            return false;
        }
    }

    public async refreshPassword(currentPassword: string, newPassword: string): Promise<boolean> {
        const body = {
            currentPassword,
            newPassword,
        };
        try {
            await this.http.post(`${this.restUrl}/api/Password`, body).toPromise();
            return true;
        } catch (e) {
            console.error('refreshPassword', e);
            return false;
        }
    }
}
