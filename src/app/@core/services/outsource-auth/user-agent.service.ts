import {Injectable} from '@angular/core';
import { UserAgent } from '@ionic-native/user-agent/ngx';

@Injectable({
    providedIn: 'root'
})
export class UserAgentService {

    constructor(private userAgent: UserAgent) { }

    public setUserAgent(): void {
        try {
            this.userAgent.set('Mozilla/5.0 Google')
                .then((res: any) => console.log(res))
                .catch((error: any) => console.error(error));
        } catch (e) { console.error(e); }
    }
}
