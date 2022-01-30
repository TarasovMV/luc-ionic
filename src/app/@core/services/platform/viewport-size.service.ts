import {Injectable} from '@angular/core';
import {KeyboardService} from './keyboard.service';
import {Device} from '@capacitor/device';

const MAX_DELTA = 200;

@Injectable({
    providedIn: 'root'
})
export class ViewportSizeService {

    constructor(private keyboard: KeyboardService) {}

    public async init(): Promise<void> {
        const platformType = (await Device.getInfo())?.platform;
        if (platformType !== 'web') {
            return;
        }
        const initHeight = window.innerHeight;
        let vh = initHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            const currentHeight = window.innerHeight;
            if (initHeight - currentHeight > MAX_DELTA) {
                this.keyboard.keyboardHeight$.next(initHeight - currentHeight);
            } else {
                this.keyboard.keyboardHeight$.next(0);
                vh = currentHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
        });
    }
}
