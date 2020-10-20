import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBarService} from './@core/services/status-bar.service';
import {KeyboardService} from './@core/services/keyboard.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBarService: StatusBarService,
        private keyboardService: KeyboardService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            this.statusBarService.setDefault();
            this.keyboardService.setInitSettings();
        });
    }
}
