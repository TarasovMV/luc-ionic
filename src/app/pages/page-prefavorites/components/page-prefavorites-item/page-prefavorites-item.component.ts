import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-prefavorites-item',
    templateUrl: './page-prefavorites-item.component.html',
    styleUrls: ['./page-prefavorites-item.component.scss'],
})
export class PagePrefavoritesItemComponent implements OnInit {
    @Input() image;
    @Input() isSelected: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        setTimeout(() => this.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4cXilLqWd8tskKFoG040zVnSymkScPPq_OQ&usqp=CAU', Math.random() * 3 * 1000);
    }
}
