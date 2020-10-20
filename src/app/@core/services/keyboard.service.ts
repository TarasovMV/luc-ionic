import {Injectable} from '@angular/core';
import {KeyboardResize, KeyboardStyle, Plugins} from '@capacitor/core';
const { Keyboard } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class KeyboardService {

    constructor() {
    }

    // TODO: add theme
    public async setInitSettings(): Promise<void> {
        try {
            await Keyboard.setStyle({style: KeyboardStyle.Light});
            await Keyboard.setResizeMode({mode: KeyboardResize.None});
        } catch {}
    }
}
