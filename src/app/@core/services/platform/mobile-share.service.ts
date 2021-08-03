import {Injectable} from '@angular/core';
import {Share, ShareOptions} from '@capacitor/share';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class MobileShareService {

    constructor(private platform: Platform) {
    }

    public async shareApp(): Promise<void> {
        const androidUrl: string = 'https://play.google.com/store/apps/details?id=com.luc.app';
        this.shareData(
            'LUC',
            `Привет! Хочешь найти подходящую тебе одежду и стиль, тогда скачивай скорее приложение LUC: Android - ${androidUrl}, iOS - уже скоро`,
        );
    }

    public shareData(title: string, text: string, url: string = null): void {
        this.share({
            title,
            text,
            url,
            dialogTitle: title,
        }).then();
    }

    private async share(options: ShareOptions): Promise<void> {
        if (this.platform.is('android') || this.platform.is('ios')) {
            const shareRes = await Share.share(options);
        } else {
            console.warn('your system not supported');
        }
    }
}
