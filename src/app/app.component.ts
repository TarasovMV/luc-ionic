import {Component, ElementRef, ViewChild} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBarService} from './@core/services/platform/status-bar.service';
import {KeyboardService} from './@core/services/platform/keyboard.service';
import {Observable} from 'rxjs';
import {VkAuthService} from './@core/services/outsource-auth/vk-auth.service';
import {UserAgentService} from './@core/services/outsource-auth/user-agent.service';
import {UserInfoService} from "./@core/services/user-info.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    @ViewChild('appWindow', {static: true}) appWindow: ElementRef;
    public height$: Observable<number>;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBarService: StatusBarService,
        private keyboardService: KeyboardService,
        private userAgentService: UserAgentService,
        private userInfoService: UserInfoService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            this.statusBarService.setDefault();
            this.keyboardService.setInitSettings(this.platform, this.appWindow);
            // this.userAgentService.setUserAgent(); // TODO: not work
        });
    }
}
