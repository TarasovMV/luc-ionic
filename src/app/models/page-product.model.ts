export interface IPageProductModel {
    shopTitle: string;
    shopUrl: string;
    product: IPageProductPriceModel;
    infoList: IPageProductInfoModel[];
}

export interface IPageProductInfoModel {
    title: string;
    value: string;
}

export interface IPageProductPriceModel {
    brand: string;
    type: string;
    price: number;
    oldPrice?: number;
}
