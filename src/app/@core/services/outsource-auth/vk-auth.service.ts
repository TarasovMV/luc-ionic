import {Injectable} from '@angular/core';
import {AppConfigService} from '../app-config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class VkAuthService {

    private readonly vkAuthEndpoint: string = 'https://oauth.vk.com/authorize';
    public readonly vkAuthParams: {[key: string]: string} = {
        client_id: '7669704',
        redirect_uri: `${this.appConfigService.locationOrigin}/main/tabs/user`,
        // redirect_uri: `https://oauth.vk.com/blank.html`,
        response_type: 'token',
        display: 'mobile',
        scope: '1', // TODO check
        state: 'vk',
    };

    constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    }

    public async authRequest(): Promise<void> {
        let uri = `${this.vkAuthEndpoint}?`;
        uri += Object.keys(this.vkAuthParams).map(x => `${x}=${this.vkAuthParams[x]}`).join('&');
        // location.href = uri;
        window.open(uri, 'self');
    }
}
