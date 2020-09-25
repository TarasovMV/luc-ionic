export interface IPagePreviewCard {
    img: PagePreviewCardImage;
    title: string;
    description: string;
    isActive?: boolean;
}

// TODO add real images
export type PagePreviewCardImage = 'img1' | 'img2' | 'img3' | 'img4';
