import {Injectable} from '@angular/core';
import {IRecognitionResult, IRecognitionTextResult, IStartScreenReco} from '../../models/recognition.model';
import {IProductModel, IProductPreviewModel} from '../../models/page-product.model';
import {UserInfoService} from './user-info.service';
import {ApiRecognitionService} from './api/api-recognition.service';
import {BehaviorSubject} from 'rxjs';
import {TinderSuggestionType} from '../../models/tinder.model';
import {AppConfigService} from './platform/app-config.service';

@Injectable({
    providedIn: 'root'
})
export class RecognitionInfoService {
    public recommendCards$: BehaviorSubject<IProductPreviewModel[]> =
        new BehaviorSubject<IProductPreviewModel[]>([null, null, null]);
    public recognitionSaveFunction: () => Promise<IRecognitionResult>;
    public recognitionFeedFunction: () => Promise<IProductModel>;

    private readonly restUrl: string;

    constructor(
        private userInfoService: UserInfoService,
        private apiRecognitionService: ApiRecognitionService,
        configService: AppConfigService,
    ) {
        this.restUrl = configService.recognitionUrl;
    }

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

    public async getMainRecommends(force: boolean = false): Promise<void> {
        if (this.isMainRecommendsLoaded() && !force) {
            return;
        }
        const res = await this.apiRecognitionService.getMainRecommends();
        this.recommendCards$.next(res);
    }

    public isMainRecommendsLoaded(): boolean {
        return !this.recommendCards$.getValue().every(x => x === null);
    }

    public imgHandlerUrl(type: TinderSuggestionType, id: number): string {
        // return "http://194.67.203.143:5679/api/Photo/feed/762548";
        if (type === 'feed') {
            return `${this.restUrl}/api/Photo/feed/${id}`;
        }
        return `${this.restUrl}/api/Photo/tinder/${id}`;
    }
}
