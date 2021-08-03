import {Injectable} from '@angular/core';
import {AppConfigService} from '../platform/app-config.service';
import {HttpClient} from '@angular/common/http';
import {VKAuth} from 'capacitor-plugin-vk-auth';
// import {VKAuthWeb} from 'capacitor-plugin-vk-auth/dist/esm/web';

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
        scope: 'offline', // TODO check
        state: 'vk',
    };

    constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    }

    // @deprecated
    // public async authRequest(): Promise<void> {
    //     let uri = `${this.vkAuthEndpoint}?`;
    //     uri += Object.keys(this.vkAuthParams).map(x => `${x}=${this.vkAuthParams[x]}`).join('&');
    //     await Browser.open({url: uri, presentationStyle: 'popover'});
    // }

    public async authRequestPlugin(): Promise<string> {
        // const VKAuth = Plugins.VKAuth as VKAuthWeb;
        const init = await VKAuth.initWithId({ id: '7731427' });
        const scope = await VKAuth.auth({ scope: ['offline'] });

        return new Promise((resolve, reject) => {
            (VKAuth as any).addListener('vkAuthFinished', (info) => {
                console.log('vkAuthFinished was fired', JSON.stringify(info, null, 2));
                resolve(info.token);
            });
        });
    }
}
