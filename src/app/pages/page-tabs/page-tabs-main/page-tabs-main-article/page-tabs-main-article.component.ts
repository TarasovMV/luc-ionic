import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ModalController, NavParams} from '@ionic/angular';
import {IArticleJson} from '../../../../models/article.model';

@Component({
    selector: 'app-page-tabs-main-article',
    templateUrl: './page-tabs-main-article.component.html',
    styleUrls: ['./page-tabs-main-article.component.scss'],
})
export class PageTabsMainArticleComponent implements OnInit {
    @Input() set articleJson(value: IArticleJson) {
        this.articleData$.next(value);
    }
    public articleData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public sources$: Observable<string> = this.articleData$.pipe(
        filter(x => !!x),
        map(x => x.sources.join(', '))
    );

    constructor(private http: HttpClient, private modalCtrl: ModalController, private params: NavParams) {
    }

    ngOnInit(): void {
        // this.init().then();
    }

    public async close(): Promise<void> {
        await this.modalCtrl.dismiss();
    }

    private async init(): Promise<void> {
        // const res = await this.http.get('assets/article-example.json').toPromise();
        const res = this.params.get('articleJson');
        console.log(res);
        this.articleData$.next(res);
    }

}
