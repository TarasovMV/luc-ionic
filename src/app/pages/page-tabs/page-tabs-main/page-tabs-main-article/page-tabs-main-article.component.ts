import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-page-tabs-main-article',
    templateUrl: './page-tabs-main-article.component.html',
    styleUrls: ['./page-tabs-main-article.component.scss'],
})
export class PageTabsMainArticleComponent implements OnInit {
    public articleData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public sources$: Observable<string> = this.articleData$.pipe(
        filter(x => !!x),
        map(x => x.sources.join(', '))
    );

    constructor(private http: HttpClient, private modalCtrl: ModalController) {
    }

    ngOnInit(): void {
        this.init().then();
    }

    public async close(): Promise<void> {
        await this.modalCtrl.dismiss();
    }

    private async init(): Promise<void> {
        const res = await this.http.get('assets/article-example.json').toPromise();
        console.log(res);
        this.articleData$.next(res);
    }

}
