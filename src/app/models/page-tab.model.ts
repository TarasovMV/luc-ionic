export interface IPageTab {
    readonly tabName: PageTabType;
}

export type PageTabType = 'search' | 'blocks' | 'like' | 'user';
