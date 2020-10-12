import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-page-tabs-main-camera',
    templateUrl: './page-tabs-main-camera.component.html',
    styleUrls: ['./page-tabs-main-camera.component.scss'],
})
export class PageTabsMainCameraComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    public async clickCamera(): Promise<void> {
        await this.router.navigateByUrl('/main/camera');
    }

}
