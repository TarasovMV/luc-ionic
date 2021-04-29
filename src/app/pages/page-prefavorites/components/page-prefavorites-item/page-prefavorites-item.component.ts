import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-prefavorites-item',
    templateUrl: './page-prefavorites-item.component.html',
    styleUrls: ['./page-prefavorites-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePrefavoritesItemComponent implements OnInit {
    @Input() image;
    @Input() isSelected: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }
}
