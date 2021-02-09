import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loading: HTMLIonLoadingElement = null;

    constructor(private loadingController: LoadingController) {
    }

    public async startLoading(): Promise<void> {
        if (!!this.loading) {
            await this.stopLoading();
        }
        this.loading = await this.loadingController.create({
            message: 'Please wait...',
            duration: 5000
        });
        await this.loading.present();
    }

    public async stopLoading(): Promise<void> {
        if (!this.loading) {
            return;
        }
        await this.loading.dismiss();
        this.loading = null;
    }
}
