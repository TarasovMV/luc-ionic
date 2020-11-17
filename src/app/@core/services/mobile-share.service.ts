import {Injectable} from '@angular/core';
import {Plugins, ShareOptions} from '@capacitor/core';
import {Platform} from '@ionic/angular';
const { Share } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class MobileShareService {

    constructor(private platform: Platform) {
    }

    private async share(options: ShareOptions): Promise<void> {
        if (this.platform.is('android' || 'ios')) {
            const shareRet = await Share.share(options);
        } else {
            console.warn('your system not supported');
        }
    }
}
