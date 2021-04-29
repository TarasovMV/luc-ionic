// TODO отнаследовать модель от IPageProductPreviewModel (extends)
export interface IProductModel extends IProductPreviewModel {
    shopTitle: string;
    shopUrl: string;
    infoList: IPageProductInfoModel[];
    isFavorite?: boolean; // TODO add references
}

export interface IPageProductInfoModel {
    title: string;
    value: string;
}

export interface IProductPreviewModel {
    id: number; // TODO add references
    imageUrl: string;
    brand: string;
    type: string;
    price: number;
    oldPrice?: number;
    isFavorite?: boolean; // TODO add references
}
