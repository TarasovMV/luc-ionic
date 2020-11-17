import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-tabs-favourites-item',
    templateUrl: './page-tabs-favourites-item.component.html',
    styleUrls: ['./page-tabs-favourites-item.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsFavouritesItemComponent implements OnInit {
    @Input() image;

    constructor() {
    }

    ngOnInit(): void {
        setTimeout(() => this.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4cXilLqWd8tskKFoG040zVnSymkScPPq_OQ&usqp=CAU', Math.random() * 3 * 1000);
    }

}
