import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-page-tabs-main-camera',
    templateUrl: './page-tabs-main-camera.component.html',
    styleUrls: ['./page-tabs-main-camera.component.scss'],
})
export class PageTabsMainCameraComponent implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    ngOnInit(): void {
    }

    public async clickCamera(): Promise<void> {
        await this.navCtrl.navigateRoot('/main/camera');
    }

}
