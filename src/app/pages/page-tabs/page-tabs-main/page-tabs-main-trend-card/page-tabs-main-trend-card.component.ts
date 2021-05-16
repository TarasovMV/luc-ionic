import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IArticle} from '../../../../models/article.model';
import {PageTabsMainArticleComponent} from '../page-tabs-main-article/page-tabs-main-article.component';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-page-tabs-main-trend-card',
    templateUrl: './page-tabs-main-trend-card.component.html',
    styleUrls: ['./page-tabs-main-trend-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsMainTrendCardComponent implements OnInit {
    @Input() data: IArticle;

    constructor(private modalController: ModalController) {}

    public ngOnInit(): void {}

    public async presentModalArticle(): Promise<void> {
        const modal = await this.modalController.create({
            component: PageTabsMainArticleComponent,
            componentProps: { articleJson: this.data.jsonContent }
        });
        await modal.present();
    }
}
