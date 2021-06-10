import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBarService} from './@core/services/platform/status-bar.service';
import {KeyboardService} from './@core/services/platform/keyboard.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserAgentService} from './@core/services/outsource-auth/user-agent.service';
import {UserInfoService} from './@core/services/user-info.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('appWindow', {static: true}) private appWindow: ElementRef;
    @ViewChild('statusBar', {static: true}) private statusBar: ElementRef;
    public height$: Observable<number>;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBarService: StatusBarService,
        private keyboardService: KeyboardService,
        private userAgentService: UserAgentService,
        private userInfoService: UserInfoService,
    ) {}

    public async ngOnInit(): Promise<void> {
        this.initializeApp();
        console.log(this.appWindow);
    }

    private initializeApp(): void {
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            this.statusBarService.init(this.statusBar);
            this.statusBarService.setDefault();
            this.keyboardService.setInitSettings(this.platform, this.appWindow);
            // this.userAgentService.setUserAgent(); // TODO: not work
        });
    }
}
