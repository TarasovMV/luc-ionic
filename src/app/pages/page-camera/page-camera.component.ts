import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Plugins} from '@capacitor/core';
import {CameraPreviewOptions} from '@capacitor-community/camera-preview';
import {CameraResultType, CameraSource} from '@capacitor/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {NavController} from '@ionic/angular';
import {StatusBarService} from '../../@core/services/status-bar.service';
import {ApiRecognitionService} from '../../@core/services/api/api-recognition.service';
import {PageCameraDotGroup} from "./components/page-camera-dot/page-camera-dot-group.class";
import {LoadingService} from "../../@core/services/loading.service";
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

    private subscriptions: Subscription[] = [];

    private options: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        position: 'rear',
        toBack: true,
        parent: 'camera-preview',
        className: 'camera-preview',
    };

    constructor(
        private location: Location,
        private navCtrl: NavController,
        private statusBarService: StatusBarService,
        private apiRecognitionService: ApiRecognitionService,
        private loadingService: LoadingService,
    ) {}

    public ngOnInit(): void {
        this.statusBarService.hide().then();
    }

    public ngAfterViewInit(): void {
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
        this.statusBarService.setDefault().then();
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
        if (!!this.imgSrc) {
            this.cancelPhoto();
        } else {
            this.goToPreviousRoute();
        }
    }

    public async findPhoto(): Promise<void> {
        console.log('find photo');
        await this.loadingService.startLoading();
        await this.apiRecognitionService.searchByPhoto(this.imgSrc);
        await this.loadingService.stopLoading();
        this.viewType$.next('choosing');
        const imgHtml: HTMLElement = (this.imgElement as any).el;
        const imgRange = {
            rangeX: [imgHtml.offsetLeft, imgHtml.offsetLeft + imgHtml.offsetWidth],
            rangeY: [imgHtml.offsetTop, imgHtml.offsetTop + imgHtml.offsetHeight],
        };
        console.log(imgRange);
        this.dotsGroup = new PageCameraDotGroup();
    }

    public async findDot(): Promise<void> {
        const selectedDot = this.dotsGroup.selectedDot;
        if (!selectedDot) {
            console.warn('findDot', 'there`re not selected dots');
            return;
        }
        console.log('findDot', selectedDot);
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }

    private cancelPhoto(): void {
        this.imgSrc = null;
        this.dotsGroup?.clear();
    }

    private goToPreviousRoute = (): void => {
        CameraPreview.stop();
        // queueMicrotask for camera stop fix
        queueMicrotask(() => this.location.back());
    }
}
