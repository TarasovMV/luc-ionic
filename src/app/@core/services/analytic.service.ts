import {Injectable} from '@angular/core';
import {UserInfoService} from './user-info.service';
import { Device } from '@capacitor/device';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from './platform/app-config.service';
import {uuidGenerate} from '../../@shared/functions/uuid-generator.function';
import { App } from '@capacitor/app';
import {filter, take} from 'rxjs/operators';

export interface ILog<T> {
    severity: 'error'| 'warning'| 'info'| 'debug'| 'trace'| 'greetingsForAwesomeBackend';
    data: T;
    message?: string;
}

export interface IAnalyticBase<T = never> {
    deviceId: string;
    userId: string | number;
    sessionId: string;
    platform: string;
    timestamp: string;
    action: AnalyticAction;
    event: AnalyticAction;
    additional?: T;
}

export type AnalyticAction =
    'enter' |             // вход в приложение                                  Base
    'text-search' |       // поиск по тексту                                    search
    'take-photo' |        // сделать фото                                       Base
    'make-photo' |        // выбрать фото                                       Base
    'recommendation' |    // рекомендации                                       productId
    'article' |           // статья                                             articleId
    'lucich-search' |     // поиск из Лукича                                    lucichId
    'lucich-feed' |       // переход в фид из Лукича                            productId
    'lucich-swipe' |      // свайпы в Лукиче                                    Base
    'favorite-search' |   // поиск по фото из избранного                        favoriteId
    'shop-redirect' |     // переход в магазине                                 shopUrl
    'login' |             // логин                                              email
    'heartbeat';          // счетчик времени работы приложения в секундах       interval(ms)

@Injectable({
    providedIn: 'root'
})
export class AnalyticService {
    private deviceId: string;
    private platform: string;
    private sessionId: string;

    private timer: ReturnType<typeof setInterval>;

    private readonly restUrl: string;

    constructor(
        private http: HttpClient,
        private userInfo: UserInfoService,
        appConfig: AppConfigService,
    ) {
        this.restUrl = appConfig.restUrl;
        this.initInfo().then();
    }

    public async log<T = never>(action: AnalyticAction, additional?: T): Promise<void> {
        console.log('action', action);
        const analytic = {...this.getBase(action), ...additional};
        if (action !== 'heartbeat') {
            window['dataLayer'].push(analytic);
        }
        const log = {
            severity: 'trace',
            message: 'analytic',
            data: analytic,
        };
        await this.http.post(`${this.restUrl}/api/logs`, log).toPromise();
    }

    private getBase(action: AnalyticAction): IAnalyticBase {
        const user = this.userInfo.authUser$.getValue();
        return {
            deviceId: this.deviceId,
            userId: user.id || user.anonymousId,
            sessionId: this.sessionId,
            timestamp: (new Date()).toISOString(),
            platform: this.platform,
            event: action,
            action,
        };
    }

    private async initInfo(): Promise<void> {
        this.deviceId = (await Device.getId())?.uuid;
        this.platform = (await Device.getInfo())?.platform;
        this.sessionId = uuidGenerate();
        this.startTimer();

        this.userInfo.authUser$.pipe(filter(x => !!x), take(1)).subscribe(x => {
            this.log('enter');
        });

        App.addListener('appStateChange', ({isActive}) => {
            if (isActive) {
                this.startTimer();
            } else {
                this.stopTimer();
            }
        });
    }

    private startTimer(): void {
        if (!!this.timer) {
            return;
        }
        const interval = 60 * 1000; // 30 seconds
        this.timer = setInterval(() => {
            this.log('heartbeat', {interval});
        }, interval);
    }

    private stopTimer(): void {
        clearInterval(this.timer);
        this.timer = undefined;
    }
}
