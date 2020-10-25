import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ISharedFilterColor} from '../../../../models/shared-filter.model';

@Component({
    selector: 'app-shared-filter-color-item',
    templateUrl: './shared-filter-color-item.component.html',
    styleUrls: ['./shared-filter-color-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedFilterColorItemComponent implements OnInit {

    @Input() data: ISharedFilterColor = null;
    @Input() isActive: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
