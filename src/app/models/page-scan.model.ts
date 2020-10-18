export interface IPageScanModel {
    id: number;
}

export interface IPageScanProductModel {
    id?: number;
    currentPrice: number;
    oldPrice?: number;
    brand: string;
    category: string;
}
