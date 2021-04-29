import {Injectable} from '@angular/core';
import {IRecognitionResult, IRecognitionTextResult, IStartScreenReco} from '../../models/recognition.model';
import {IProductModel} from "../../models/page-product.model";
import {UserInfoService} from './user-info.service';
import {ApiRecognitionService} from './api/api-recognition.service';

@Injectable({
    providedIn: 'root'
})
export class RecognitionInfoService {

    public recognitionSaveFunction: () => Promise<IRecognitionResult>;
    public recognitionFeedFunction: () => Promise<IProductModel>;

    constructor(
        private userInfoService: UserInfoService,
        private apiRecognitionService: ApiRecognitionService,
    ) {}

    public textResultMapper(result: IRecognitionTextResult): IRecognitionResult {
        return {
            scoreId: result?.id,
            previews: result?.searchResults ?? [],
        };
    }

    public async getStartReco(): Promise<IStartScreenReco[]> {
        const gender = await this.userInfoService.getInitialGender();
        return await this.apiRecognitionService.getStartScreenReco(gender);
    }
}
