import {
    ISharedFilterBrand,
    ISharedFilterColor,
    ISharedFilterMain,
    ISharedFilterPrice,
    SharedFilterTypes
} from '../../../models/shared-filter.model';

export const DATA_SOURCE_MAIN: ISharedFilterMain[] = [
    {
        label: 'Бренд',
        type: SharedFilterTypes.Brand,
    },
    {
        label: 'Цвет',
        type: SharedFilterTypes.Color,
    },
    {
        label: 'Цена',
        type: SharedFilterTypes.Price,
    },
];

export const DATA_SOURCE_COLORS: ISharedFilterColor[] = [
    {
        id: 1,
        color: 'red',
        count: 23,
        label: 'красный',
    },
    {
        id: 2,
        color: 'blue',
        count: 123,
        label: 'синий',
    },
    {
        id: 3,
        color: 'green',
        count: 5,
        label: 'зеленый',
    },
];

export const DATA_SOURCE_BRANDS: ISharedFilterBrand[] = [
    {
        id: 1,
        label: 'Брэнд 1',
    },
    {
        id: 2,
        label: 'Брэнд 2',
    },
    {
        id: 3,
        label: 'Брэнд 3',
    },
];

export const DATA_SOURCE_PRICES: ISharedFilterPrice[] = [
    {
        id: 1,
        label: 'от 1079 до 2000',
        lowerPrice: 1079,
        higherPrice: 2000,
    },
    {
        id: 2,
        label: 'от 2000 до 4000',
        lowerPrice: 2000,
        higherPrice: 4000,
    },
    {
        id: 3,
        label: 'от 4000 до 7000',
        lowerPrice: 4000,
        higherPrice: 7000,
    },
    {
        id: 4,
        label: 'от 7000 до 44000',
        lowerPrice: 7000,
        higherPrice: 44000,
    },
];
