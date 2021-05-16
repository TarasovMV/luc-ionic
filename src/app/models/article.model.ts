export interface IArticle {
    id: number;
    title: string;
    imageUrl: string;
    createdAt: Date;
    isActive: boolean;
    jsonContent: IArticleJson;
    order: number;
    updatedAt: undefined;
}

export interface IArticleJson {
    title: string;
    sources: string[];
    author: IArticleJsonAuthor;
    blocks: IArticleJsonBlock[];
}

export interface IArticleJsonAuthor {
    name: string;
    url: string;
}

export interface IArticleJsonBlock {
    type: ArticleJsonBlockType;
    text?: string;
    urls: string[];
}

export type ArticleJsonBlockType = 'text' | 'subtitle' | 'photo';
