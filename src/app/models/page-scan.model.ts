export interface IPageScanModel {
    products: IPageScanProductModel[];
}

export interface IPageScanProductModel {
    id?: number;
    imageUrl?: string;
    price: number;
    oldPrice?: number;
    brand: string;
    category: string;
    type?: string;
}
