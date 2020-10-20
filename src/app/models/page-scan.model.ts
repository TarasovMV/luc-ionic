export interface IPageScanModel {
    products: IPageScanProductModel[];
}

export interface IPageScanProductModel {
    id?: number;
    price: number;
    oldPrice?: number;
    brand: string;
    category: string;
}
