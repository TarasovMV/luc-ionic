import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonInput, ModalController} from '@ionic/angular';

@Component({
    selector: 'app-page-tabs-main-search-modal',
    templateUrl: './page-tabs-main-search-modal.component.html',
    styleUrls: ['./page-tabs-main-search-modal.component.scss'],
})
export class PageTabsMainSearchModalComponent implements AfterViewInit {

    @ViewChild('searchInput') searchInput: IonInput;

    public tempStr: string = '';

    constructor(private modalCtrl: ModalController) {
    }

    public ngAfterViewInit(): void {
        setTimeout(() => this.searchInput.setFocus(), 1000);
    }

    public search(): void {
        this.tempStr += this.searchInput.value.toString();
    }

    public async close(): Promise<void> {
        await this.modalCtrl.dismiss();
    }
}
