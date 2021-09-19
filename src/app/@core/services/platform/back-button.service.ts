import {Injectable} from '@angular/core';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';
import {filter, skip} from 'rxjs/operators';
import {App} from '@capacitor/app';

@Injectable({
    providedIn: 'root'
})
export class BackButtonService {
    private rootSubscription: Subscription;
    private actionSubscription: Subscription;
    private backCounter: number = 0;

    private readonly rootPages: string[] = [
        'preview',
        'user_init',
        'pre_favorites',
        'tabs',
        'main',
        'tinder',
        'favorites',
        'user',
    ];

    constructor(
        private navCtrl: NavController,
        private platform: Platform,
        private router: Router,
        private toastController: ToastController,
    ) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart), skip(1))
            .subscribe((x: NavigationStart) => {
                if (this.isRootPage(x.url)) {
                    this.disableBackOnRoot();
                } else {
                    this.clearOnRoot();
                    this.default();
                }
            });
    }

    public init(): void {
        this.disableBackOnRoot();
    }

    public default(): void {
        this.platform.backButton.subscribeWithPriority(9999, () => {
            this.navCtrl.back();
        });
    }

    public actionOnBack(action: () => void, isBack: boolean = true): void {
        this.rootSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
            action();
            if (isBack) {
                this.navCtrl.back();
            }
        });
    }

    public disableBackOnRoot(): void {
        this.rootSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
            this.backCounter++;
            if (this.backCounter === 2) {
                App.exitApp();
            } else {
                this.showBackElseMessage().then();
                setTimeout(() => this.backCounter = 0, 1500);
            }
        });
    }

    public clearOnRoot(): void {
        if (!this.rootSubscription) {
            return;
        }
        this.rootSubscription?.unsubscribe();
        this.rootSubscription = null;
    }

    public clearAction(): void {
        if (!this.actionSubscription) {
            return;
        }
        this.actionSubscription?.unsubscribe();
        this.actionSubscription = null;
    }

    private async showBackElseMessage(): Promise<void> {
        const toast = await this.toastController.create({
            message: 'Для выхода из приложения нажмите "Назад" еще раз',
            duration: 1500,
            cssClass: 'custom-toast',
        });
        await toast.present();
    }

    private isRootPage(path: string): boolean {
        const checkPath = path.split('/').slice(-1)[0];
        for (const page of this.rootPages) {
            if (checkPath === page) {
                return true;
            }
        }
        return false;
    }
}
