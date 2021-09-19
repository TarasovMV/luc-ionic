import {IProductModel} from './page-product.model';

export interface IFavouriteItem {
    createdAt: Date;
    feed: IProductModel;
    imageUrl: string;
    tinderItem: {
        id: number;
        imageUrl: string;
    };
}
