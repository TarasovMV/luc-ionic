import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// camera web view
import '@capacitor-community/camera-preview';
import {AppConfigService} from './services/app-config.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [AppConfigService],
            useFactory: (appConfigService: AppConfigService) => {
                return () => {
                    return appConfigService.loadAppConfig();
                };
            }
        },
    ]
})
export class CoreModule {
}
