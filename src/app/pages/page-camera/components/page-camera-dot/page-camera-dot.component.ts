import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-page-camera-dot',
    templateUrl: './page-camera-dot.component.html',
    styleUrls: ['./page-camera-dot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCameraDotComponent implements OnInit {
    @Input() isActive: boolean = false;
    @Output() selectDot: EventEmitter<unknown> = new EventEmitter<unknown>();

    constructor() {
    }

    ngOnInit() {
    }

}
