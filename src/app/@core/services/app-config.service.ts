import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAppConfig} from '../models/config.model';
import {PlatformLocation} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private appConfig: IAppConfig;

    constructor(private httpClient: HttpClient, private platformLocation: PlatformLocation) {}

    public async loadAppConfig(): Promise<void> {
        this.appConfig = await this.httpClient.get<IAppConfig>('assets/config.json').toPromise();
    }

    public get restUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.restUrl;
    }

    public get userUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.userUrl;
    }

    public get recognitionUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.recognitionUrl;
    }

    public get locationOrigin(): string {
        return (this.platformLocation as any).location.origin;
    }

    load(): Promise<any>  {
        return this.httpClient.get('assets/config.json')
            .toPromise()
            .then(x => {
                this.appConfig = x as any;
                return x;
            });
    }
}
