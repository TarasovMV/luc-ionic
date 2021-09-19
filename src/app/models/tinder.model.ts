import {IProductPreviewModel} from './page-product.model';

export interface ITinderSuggestionId {
    feedId?: number;
    tinderId?: number;
    tinderItemId?: number; // for back map
}

export interface ITinderSuggestion extends ITinderSuggestionId {
    type: TinderSuggestionType;
    imageUrl: string;
    feedUrl: string;
    description: string;
    feedPreview?: IProductPreviewModel; // if type == feed
    isFavourite: boolean;
}

export type TinderSuggestionType = 'feed' | 'tinderItem';
