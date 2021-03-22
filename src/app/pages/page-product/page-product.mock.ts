import {IPageProductModel} from '../../models/page-product.model';

export const DATA_SOURCE: IPageProductModel = {
    id: new Uint8Array(1234),
    imageUrl: '',
    shopTitle: 'Lamoda',
    shopUrl: 'http://example.com',
    brand: 'Mango Man',
    type: 'Рубашка',
    price: 1990,
    oldPrice: 4990,
    infoList: [
        {
            title: 'Состав',
            value: 'Хлопок - 80%, Вискоза - 20%',
        },
        {
            title: 'Размер товара на модели',
            value: 'M INT',
        },
        {
            title: 'Параметры модели',
            value: '98-73-95',
        },
        {
            title: 'Рост модели на фото',
            value: '188',
        },
        {
            title: 'Длина',
            value: '79 см',
        },
        {
            title: 'Длина рукава',
            value: '66 см',
        },
        {
            title: 'Сезон',
            value: 'мульти',
        },
        {
            title: 'Цвет',
            value: 'зеленый',
        },
        {
            title: 'Узор',
            value: 'другое',
        },
        {
            title: 'Тип силуэта',
            value: 'приталенный',
        },
        {
            title: 'Гарантийный период',
            value: 'не установлен',
        },
        {
            title: 'Страна производства',
            value: 'Турция',
        },
        {
            title: 'Застежка',
            value: 'пуговицы',
        },
        {
            title: 'Артикул',
            value: 'MP002XM23TB7',
        },
    ],
};
