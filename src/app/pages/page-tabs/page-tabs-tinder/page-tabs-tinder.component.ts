import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GestureController, IonSlides, Platform} from '@ionic/angular';
import {BehaviorSubject, Subject} from 'rxjs';
import {IPageTab, PageTabType} from '../../../models/page-tab.model';
import {ITinderSuggestion} from '../../../models/tinder.model';
import {ApiTinderService} from '../../../@core/services/api/api-tinder.service';
import {AnalyticService} from '../../../@core/services/analytic.service';
import {SLIDE_CONFIG_TINDER} from './swipe.config';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'app-page-tabs-tinder',
    templateUrl: './page-tabs-tinder.component.html',
    styleUrls: ['./page-tabs-tinder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsTinderComponent implements IPageTab, OnInit, AfterViewInit {
    readonly tabName: PageTabType = 'blocks';
    slideOpts = SLIDE_CONFIG_TINDER(() => this.slideDetect$.next(true));

    @ViewChild('tinderCard') tinderCard: ElementRef;
    @ViewChild('ionSlides') ionSlide: IonSlides;

    public cards$ = new BehaviorSubject([
        () => this.getNextImage(),
        () => this.getNextImage(),
        () => this.getNextImage(),
    ]);

    private slideDetect$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private apiTinderService: ApiTinderService,
        private gestureCtrl: GestureController,
        private platform: Platform,
        private analyticService: AnalyticService,
        private cdRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        // this.slideDetect$.pipe(debounceTime(100)).subscribe(x => this.slideDetectChange());
        // this.cards$.subscribe(x => console.log(x));
    }

    public ngAfterViewInit(): void {
        // this.useTinderSwipe(this.tinderCard, this.platform.width());
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

    private action = (actionType: 'like' | 'dislike'): void => {
        console.log('tinder-action', actionType);
    }

    public async slideDetectChange(): Promise<void> {
        this.analyticService.log('lucich-swipe');
        const cards = this.cards$.getValue();
        const currentIdx = await this.ionSlide.getActiveIndex();
        console.log('swipe', currentIdx, cards.length);
        if (cards.length - (currentIdx + 1) < 1) {
            this.cards$.next([...cards, () => this.getNextImage()]);
            // setTimeout(() => this.cdRef.detectChanges(), 1000);
        }
    }

    private getNextImage(): Promise<ITinderSuggestion> {
        return this.apiTinderService.getNextTinder();
    }
}
