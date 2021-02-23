import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-camera-dot',
    templateUrl: './page-camera-dot.component.html',
    styleUrls: ['./page-camera-dot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCameraDotComponent implements OnInit {
    @Input() isActive: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
