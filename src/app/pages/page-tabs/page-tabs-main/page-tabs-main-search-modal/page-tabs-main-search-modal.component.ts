import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {IonInput, ModalController, NavController} from '@ionic/angular';
import {RecognitionInfoService} from '../../../../@core/services/recognition-info.service';
import {ApiRecognitionService} from '../../../../@core/services/api/api-recognition.service';

@Component({
    selector: 'app-page-tabs-main-search-modal',
    templateUrl: './page-tabs-main-search-modal.component.html',
    styleUrls: ['./page-tabs-main-search-modal.component.scss'],
})
export class PageTabsMainSearchModalComponent implements AfterViewInit {

    @ViewChild('searchInput') searchInput: IonInput;

    public readonly nextRouteUrl: string = '/main/scan';

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private recognitionInfoService: RecognitionInfoService,
        private apiRecognitionService: ApiRecognitionService,
    ) {}

    public ngAfterViewInit(): void {
        setTimeout(() => this.searchInput.setFocus(), 1000);
    }

    public search(): void {
        const search = this.searchInput.value.toString();
        this.recognitionInfoService.recognitionSaveFunction = async () => {
            const res = await this.apiRecognitionService.searchByText(search);
            return this.recognitionInfoService.textResultMapper(res);
        };
        this.navCtrl.navigateRoot(this.nextRouteUrl).then();
        this.close().then();
    }

    public async close(): Promise<void> {
        await this.modalCtrl.dismiss();
    }
}
