import {IPageProductModel} from './page-product.model';

export interface IFavoritesResponse {
    feed: IPageProductModel;
    createdAt: Date;
}
