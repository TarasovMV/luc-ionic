import {ElementRef, Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
    providedIn: 'root'
})
export class StatusBarService {
    private iosBar: ElementRef;

    constructor(private platform: Platform) {}

    public async init(bar: ElementRef): Promise<void> {
        this.iosBar = bar;
        if (!this.platform.is('ios')) {
            this.iosBar.nativeElement.style = 'display: none;';
        }
    }

    // TODO: add theme
    public async setDefault(): Promise<void> {
        try {
            // await StatusBar.setOverlaysWebView({overlay: true});
            if (this.platform.is('ios')) {
                this.iosBar.nativeElement.style = 'display: block; background: #ffffff';
            }
            await StatusBar.show();
            await StatusBar.setStyle({style: Style.Light});
            await StatusBar.setBackgroundColor({color: '#ffffff'});
        } catch (e) {
            console.warn('StatusBar Error', e);
        }
    }

    public async hide(): Promise<void> {
        try {
            this.iosBar.nativeElement.style = 'display: none;';
            await StatusBar.hide();
        } catch (e) {
            console.warn('StatusBar Error', e);
        }
    }
}
