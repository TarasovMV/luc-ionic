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
    public setDefault(): void {
        StatusBar.setStyle({style: StatusBarStyle.Light});
        StatusBar.setBackgroundColor({color: '#ffffff'});
    }

    public hide(): void {
        StatusBar.hide();
    }
}
