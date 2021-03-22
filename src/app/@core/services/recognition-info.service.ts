import {Injectable} from '@angular/core';
import {IRecognitionResult, IRecognitionTextResult} from '../../models/recognition.model';
import {IPageProductModel} from "../../models/page-product.model";

@Injectable({
    providedIn: 'root'
})
export class RecognitionInfoService {

    public recognitionSaveFunction: () => Promise<IRecognitionResult>;
    public recognitionFeedFunction: () => Promise<IPageProductModel>;

    constructor() {}

    public textResultMapper(result: IRecognitionTextResult): IRecognitionResult {
        return {
            scoreId: result.id,
            previews: result.searchResults,
        };
    }
}
