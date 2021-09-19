import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppConfigService} from './services/platform/app-config.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserAgent} from '@ionic-native/user-agent/ngx';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {AuthenticationInterceptor} from './interceptors/authentication.interceptor';

// camera web view
// import '@capacitor-community/camera-preview';
import {AppTokenService} from './services/app-token.service';
import {AppRate} from '@ionic-native/app-rate/ngx';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        AppRate,
        UserAgent,
        { provide: APP_INITIALIZER, useFactory: appInit, deps: [AppConfigService], multi: true },
        { provide: APP_INITIALIZER, useFactory: loadToken, deps: [AppTokenService], multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor,  multi: true },
    ]
})
export class CoreModule {
}

function appInit(appConfigService: AppConfigService) {
    return () => appConfigService.load();
}

function loadToken(tokenService: AppTokenService) {
    return () => tokenService.loadToken();
}
