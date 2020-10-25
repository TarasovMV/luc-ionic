import {ISharedFilterColor, ISharedFilterMain, SharedFilterTypes} from '../../../models/shared-filter.model';

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
