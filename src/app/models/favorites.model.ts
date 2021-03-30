import {IProductModel} from './page-product.model';

export interface IFavoritesResponse {
    feed: IProductModel;
    createdAt: Date;
}
