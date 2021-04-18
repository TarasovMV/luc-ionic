import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GestureController, IonSlides, Platform} from '@ionic/angular';
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
    @ViewChild('ionSlides') ionSlide: IonSlides;

    public cards$ = new BehaviorSubject([
        () => this.getNextImage(),
        () => this.getNextImage(),
        () => this.getNextImage(),
    ]);

    constructor(
        private gestureCtrl: GestureController,
        private platform: Platform,
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
    }

    public async slideDetectChange(): Promise<void> {
        const cards = this.cards$.getValue();
        const currentIdx = await this.ionSlide.getActiveIndex();
        console.log(cards.length, currentIdx);
        if (cards.length - (currentIdx + 1) < 1) {
            console.log('push');
            this.cards$.next([...cards, () => this.getNextImage()]);
        }
    }

    private getNextImage(): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(() => resolve({
                url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwlooks.ru%2Fimages%2Farticle%2Forig%2F2017%2F02%2Felegantnyj-stil-v-odezhde-dlya-zhenshchin.jpg&f=1&nofb=1',
            }), 3000);
        });
    }
}
