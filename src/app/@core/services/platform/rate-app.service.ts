import {Injectable} from '@angular/core';
import {AppRate, AppRateReviewTypeAndroid} from '@ionic-native/app-rate/ngx';

@Injectable({
    providedIn: 'root'
})
export class RateAppService {

    constructor(private appRate: AppRate) {}

    public rateUs(): void {
        this.appRate.preferences = {
            usesUntilPrompt: 5,
            useLanguage: 'en',
            displayAppName: 'LUC',
            storeAppURL: {
                android: 'market://details?id=com.luc.app',
            },
        };
        this.appRate.promptForRating(true);
    }
}
