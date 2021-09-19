import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IFavouriteItem} from '../../../../models/favorites.model';

@Component({
    selector: 'app-page-tabs-favourites-item',
    templateUrl: './page-tabs-favourites-item.component.html',
    styleUrls: ['./page-tabs-favourites-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsFavouritesItemComponent implements OnInit {
    @Input() set data(value: IFavouriteItem) {
        this.item = value;
        this.image = value.imageUrl;
    }
    private item: IFavouriteItem = null;
    public image: string = null;

    constructor() {}

    ngOnInit(): void {}
}
