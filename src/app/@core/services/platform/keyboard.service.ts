import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Platform} from '@ionic/angular';
import {KeyboardResize, KeyboardStyle, Keyboard} from '@capacitor/keyboard';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class KeyboardService {

    public keyboardHeight$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public isKeyboardOpen$: Observable<boolean> = this.keyboardHeight$.pipe(map(x => x === 0));

    constructor() {
    }

    // TODO: add theme
    public async setInitSettings(platform: Platform, appWindow: ElementRef): Promise<void> {
        try {
            this.actionListeners(platform, appWindow);
            await Keyboard.setStyle({style: KeyboardStyle.Light});
            await Keyboard.setResizeMode({mode: KeyboardResize.None});
        } catch {}
    }

    public actionListeners(platform: Platform, appWindow: ElementRef): void {
        platform.keyboardDidShow.subscribe((event) => this.keyboardHeight$.next(event.keyboardHeight));
        platform.keyboardDidHide.subscribe(() => this.keyboardHeight$.next(0));
        this.keyboardHeight$.subscribe((height) => {
            appWindow.nativeElement.style = `height: calc(100% - ${height}px)`;
        });
    }
}
