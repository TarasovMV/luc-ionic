import {Injectable} from '@angular/core';
import {
    Plugins,
    StatusBarStyle,
} from '@capacitor/core';

const {StatusBar} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class StatusBarService {

    constructor() {}

    // TODO: add theme
    public async setDefault(): Promise<void> {
        try {
            await StatusBar.show();
            await StatusBar.setStyle({style: StatusBarStyle.Light});
            await StatusBar.setBackgroundColor({color: '#ffffff'});
        } catch (e) {
            console.warn('StatusBar Error', e);
        }
    }

    public async hide(): Promise<void> {
        try {
            await StatusBar.hide();
        } catch (e) {
            console.warn('StatusBar Error', e);
        }
    }
}
