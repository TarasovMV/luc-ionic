import {Component, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {NavController} from '@ionic/angular';
import {AnalyticService} from '../../@core/services/analytic.service';

@Component({
    selector: 'app-page-camera-choose',
    templateUrl: './page-camera-choose.page.html',
    styleUrls: ['./page-camera-choose.page.scss'],
})
export class PageCameraChoosePage implements OnInit {
    private readonly nextRouteUrl = '/main/camera';

    constructor(
        private navCtrl: NavController,
        private analyticService: AnalyticService,
    ) {}

    public ngOnInit(): void {}

    public back(): void {
        this.navCtrl.back();
    }

    public async openGallery(): Promise<void> {
        this.analyticService.log('take-photo');
        const picture = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            // quality: 70,
        });
        this.search(picture.dataUrl);
    }

    public async takePhoto(): Promise<void> {
        this.analyticService.log('make-photo');
        const picture = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 70,
        });
        this.search(picture.dataUrl);
    }

    private search(img: string): void {
        this.navCtrl.navigateForward(this.nextRouteUrl, {queryParams: { img }}).then();
    }
}
