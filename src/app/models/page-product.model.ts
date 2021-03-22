// TODO отнаследовать модель от IPageProductPreviewModel (extends)
export interface IPageProductModel extends IPageProductPreviewModel {
    shopTitle: string;
    shopUrl: string;
    // product: IPageProductPreviewModel;
    infoList: IPageProductInfoModel[];
    // isFavorite: boolean; // TODO add references
}

export interface IPageProductInfoModel {
    title: string;
    value: string;
}

export interface IPageProductPreviewModel {
    id: BigInteger; // TODO add references
    imageUrl: string;
    brand: string;
    type: string;
    price: number;
    oldPrice?: number;
}
