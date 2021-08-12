import {Component, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-page-camera-choose',
    templateUrl: './page-camera-choose.page.html',
    styleUrls: ['./page-camera-choose.page.scss'],
})
export class PageCameraChoosePage implements OnInit {
    private readonly nextRouteUrl = '/main/camera';

    constructor(private navCtrl: NavController) {}

    public ngOnInit(): void {}

    public back(): void {
        this.navCtrl.back();
    }

    public async openGallery(): Promise<void> {
        const picture = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            quality: 70,
        });
        this.search(picture.dataUrl);
    }

    public async takePhoto(): Promise<void> {
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
