import {IProductPreviewModel} from './page-product.model';

export interface ITinderSuggestion {
    type: TinderSuggestionType;
    imageUrl: string;
    feedUrl: string;
    feedId: number;
    tinderId: number;
    description: string;
    feedPreview?: IProductPreviewModel; // if type == feed
}

export type TinderSuggestionType = 'feed' | 'tinderItem';
