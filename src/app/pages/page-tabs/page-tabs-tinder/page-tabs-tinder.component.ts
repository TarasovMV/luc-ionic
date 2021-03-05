import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GestureController, Platform} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {IPageTab, PageTabType} from '../../../models/page-tab.model';

@Component({
    selector: 'app-page-tabs-tinder',
    templateUrl: './page-tabs-tinder.component.html',
    styleUrls: ['./page-tabs-tinder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsTinderComponent implements IPageTab, OnInit, AfterViewInit {
    readonly tabName: PageTabType = 'blocks';

    @ViewChild('tinderCard') tinderCard: ElementRef;

    public data$ = new BehaviorSubject([
        {
            url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwlooks.ru%2Fimages%2Farticle%2Forig%2F2017%2F02%2Felegantnyj-stil-v-odezhde-dlya-zhenshchin.jpg&f=1&nofb=1',
        },
        {
            url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage01.bonprix.ru%2Fassets%2F957x1344%2F1568808722%2F19235679-RveOc5BR.jpg&f=1&nofb=1',
        }
    ]);
    public currentImg$: BehaviorSubject<string> = new BehaviorSubject<string>(this.data$.value[0].url);
    public nextImg$: BehaviorSubject<string> = new BehaviorSubject<string>(this.data$.value[1].url);

    constructor(
        private gestureCtrl: GestureController,
        private platform: Platform,
        private cdRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.useTinderSwipe(this.tinderCard, this.platform.width());
    }

    private useTinderSwipe(card: ElementRef, screenWidth: number): void {
        if (!card?.nativeElement) {
            return;
        }
        const gesture = this.gestureCtrl.create({
            el: card.nativeElement,
            gestureName: 'tinder-swipe',
            onStart: (e) => {
                card.nativeElement.style.transition = `none`;
            },
            onMove: (e) => {
                card.nativeElement.style.transform = `translateX(${e.deltaX}px)`;
                // card.nativeElement.style.transform = `translateX(${e.deltaX}px) rotate(${e.deltaX / 8}deg)`;
            },
            onEnd: (e) => {
                let transform = `translateX(0px) rotate(0deg)`;
                if (e.deltaX > screenWidth / 2) {
                    transform = `translateX(${+screenWidth * 2}px)`;
                    // transform = `translateX(${+screenWidth * 2}px) rotate(${e.deltaX / 2}deg)`;
                    this.action('like');
                } else if (e.deltaX < -screenWidth / 2) {
                    transform = `translateX(${-screenWidth * 2}px)`;
                    // transform = `translateX(${-screenWidth * 2}px) rotate(${e.deltaX / 2}deg)`;
                    this.action('dislike');
                }
                card.nativeElement.style.transition = `.5s ease-out`;
                card.nativeElement.style.transform = transform;
            },
        });
        gesture.enable(true);
    }

    private action(actionType: 'like' | 'dislike'): void {
        console.log('tinder-action', actionType);
        setTimeout(() => {
            this.changeImg();
            this.tinderCard.nativeElement.style.transform = 'none';
            this.tinderCard.nativeElement.style.transition = 'none';
            this.cdRef.detectChanges();
        }, 200);
    }

    private changeImg(): void {
        this.currentImg$.next(this.getNextImg(this.currentImg$.value));
        this.nextImg$.next(this.getNextImg(this.nextImg$.value));
    }

    private getNextImg(currentImg: string): string {
        let idx = this.data$.value.findIndex(x => x.url === currentImg);
        if (idx === -1) {
            console.error('Image not found');
            return currentImg;
        }
        idx = (idx + 1) > this.data$.value.length - 1 ? 0 : idx + 1;
        return this.data$.value[idx].url;
    }
}
