import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Plugins} from '@capacitor/core';
import {CameraPreviewOptions} from '@capacitor-community/camera-preview';
import {CameraResultType, CameraSource} from '@capacitor/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {NavController, Platform} from '@ionic/angular';
import {StatusBarService} from '../../@core/services/platform/status-bar.service';
import {ApiRecognitionService} from '../../@core/services/api/api-recognition.service';
import {PageCameraDotGroup} from './components/page-camera-dot/page-camera-dot-group.class';
import {LoadingService} from '../../@core/services/loading.service';
import {IRecognitionDetected} from '../../models/recognition.model';
import {RecognitionInfoService} from '../../@core/services/recognition-info.service';
import {ActivatedRoute} from '@angular/router';
const {CameraPreview, Camera} = Plugins;

@Component({
    selector: 'app-page-camera',
    templateUrl: './page-camera.component.html',
    styleUrls: ['./page-camera.component.scss'],
})
export class PageCameraComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild('imgElement') imgElement: ElementRef;

    public readonly nextRouteUrl: string = '/main/scan';

    public viewType$: BehaviorSubject<'search' | 'choosing'> = new BehaviorSubject<'search' | 'choosing'>('search');
    public items$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    private imgSrc$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public imgSrcObservable: Observable<string> = this.imgSrc$.asObservable();
    get imgSrc(): string {
        return this.imgSrc$.getValue();
    }
    set imgSrc(value: string) {
        this.imgSrc$.next(value);
    }

    public dotsGroup: PageCameraDotGroup;

    private isSrcWithImage: boolean = false;

    private subscriptions: Subscription[] = [];

    private readonly options: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        position: 'rear',
        toBack: true,
        parent: 'camera-preview',
        className: 'camera-preview',
    };

    private responseRecognitionData: IRecognitionDetected = null;

    constructor(
        private activeRoute: ActivatedRoute,
        private location: Location,
        private navCtrl: NavController,
        private statusBarService: StatusBarService,
        private apiRecognitionService: ApiRecognitionService,
        private loadingService: LoadingService,
        private recognitionInfoService: RecognitionInfoService,
        private platform: Platform,
    ) {}

    public ngOnInit(): void {
        this.statusBarService.hide().then();
    }

    public ngAfterViewInit(): void {
        this.platform.backButton.subscribeWithPriority(9999, () => {
            this.clickClose();
        });
        const img = this.activeRoute.snapshot.queryParamMap.get('img');
        if (img) {
            this.imgSrc = img;
            this.isSrcWithImage = true;
            this.findPhoto().then();
        }
        this.subscriptions.push(
            this.imgSrcObservable.subscribe((ref) => {
                if (!!ref) {
                    CameraPreview.stop();
                } else {
                    queueMicrotask(() => CameraPreview.start(this.options));
                }
            })
        );
    }

    public async ngOnDestroy(): Promise<void> {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.imgSrc = null;
        CameraPreview.stop();
        await this.statusBarService.setDefault();
    }

    public switchCamera(): void {
        CameraPreview.flip();
    }

    public async openGallery(): Promise<void> {
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            quality: 70,
        });

        this.imgSrc = capturedPhoto.dataUrl;
    }

    public async takePhoto(): Promise<void> {
        const capturedPhoto = await CameraPreview.capture({
            quality: 70,
        });
        this.imgSrc = `data:image/png;base64, ${capturedPhoto.value}`;
    }

    public clickClose(): void {
        if (!!this.imgSrc && !this.isSrcWithImage) {
            this.cancelPhoto();
        } else {
            this.goToPreviousRoute();
        }
    }

    public async findPhoto(): Promise<void> {
        await this.loadingService.startLoading();
        const recognitionDetected = await this.apiRecognitionService.searchByPhoto(this.imgSrc);
        if (!recognitionDetected) {
            return;
        }
        await this.loadingService.stopLoading();
        this.viewType$.next('choosing');
        const imgRange = this.getImgRange();
        const imgDimension = await this.getImageDimensions(this.imgSrc);
        recognitionDetected.detectedObjects.forEach((x, i) => x.id = i);
        this.responseRecognitionData = recognitionDetected;
        this.dotsGroup = new PageCameraDotGroup(
            recognitionDetected.detectedObjects,
            imgRange,
            imgDimension,
        );
    }

    public async findDot(): Promise<void> {
        const selectedDot = this.dotsGroup.selectedDot;
        if (!selectedDot) {
            console.warn('findDot', 'there`re not selected dots');
            return;
        }
        const resDot = this.responseRecognitionData.detectedObjects.find(x => x.id === selectedDot.id);
        this.recognitionInfoService.recognitionSaveFunction =
            async () => await this.apiRecognitionService.searchByDot(this.responseRecognitionData.searchId, resDot);
        await this.navCtrl.navigateForward(this.nextRouteUrl);
    }

    private cancelPhoto(): void {
        this.imgSrc = null;
        this.dotsGroup?.clear();
        this.viewType$.next('search');
    }

    private goToPreviousRoute = (): void => {
        // queueMicrotask for camera stop fix
        queueMicrotask(() => this.location.back());
    }

    private getImgRange(): { rangeX: number[]; rangeY: number[]; } {
        const imgHtml: HTMLElement = (this.imgElement as any).el;
        return {
            rangeX: [imgHtml.offsetLeft, imgHtml.offsetLeft + imgHtml.offsetWidth],
            rangeY: [imgHtml.offsetTop, imgHtml.offsetTop + imgHtml.offsetHeight],
        };
    }

    private async getImageDimensions(file: string): Promise<{ width: number; height: number; }> {
        return new Promise ((resolved) => {
            const i = new Image();
            i.onload = () => {
                resolved({width: i.width, height: i.height});
            };
            i.src = file;
        });
    }
}
