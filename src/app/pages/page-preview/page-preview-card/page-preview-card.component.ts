import {Component, Input, OnInit} from '@angular/core';
import {IPagePreviewCard} from '../../../models/page-preview.model';

@Component({
    selector: 'app-page-preview-card',
    templateUrl: './page-preview-card.component.html',
    styleUrls: ['./page-preview-card.component.scss'],
})
export class PagePreviewCardComponent implements OnInit {

    @Input() data: IPagePreviewCard = null;

    constructor() {
    }

    ngOnInit() {
    }

}
