export enum SharedFilterTypes {
    Main,
    Color,
    Brand,
    Price,
}

export interface ISharedFilterMain {
    label: string;
    value?: ISharedFilterPrice | ISharedFilterBrand | ISharedFilterColor[];
    type: SharedFilterTypes;
}

export interface ISharedFilterColor {
    id: number;
    label: string;
    color: string;
    count: number;
}

export interface ISharedFilterBrand {
    id: number;
    label: string;
}

export interface ISharedFilterPrice {
    id: number;
    label: string;
    lowerPrice?: number;
    higherPrice?: number;
}

export type SharedFilterUnion = ISharedFilterPrice | ISharedFilterBrand | ISharedFilterColor;
