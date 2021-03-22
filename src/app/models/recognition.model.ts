import {IPageScanProductModel} from './page-scan.model';

export interface IRecognitionDetected {
    detectedObjects: IRecognitionDetectedObject[];
    searchId: number;
}

export interface IRecognitionDetectedObject {
    id?: number; // client only (artificial by index)
    area: {
        lowerLeftCorner: {
            x: number;
            y: number;
        };
        upperRightCorner: {
            x: number;
            y: number;
        };
    };
    label: string;
    score: number;
}

export interface IRecognitionResult {
    previews: IPageScanProductModel[];
    scoreId: number;
}

export interface IRecognitionTextResult {
    id: number;
    time: Date;
    query: string;
    searchResults: IPageScanProductModel[];
    searchResultsCount: number;
}
