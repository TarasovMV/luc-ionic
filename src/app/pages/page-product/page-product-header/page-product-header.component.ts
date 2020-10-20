import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-page-product-header',
    templateUrl: './page-product-header.component.html',
    styleUrls: ['./page-product-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageProductHeaderComponent implements OnInit {

    @Input() label: string = null;
    @Output() back: EventEmitter<null> = new EventEmitter<null>();

    constructor() {
    }

    public ngOnInit(): void {
    }

    public backClick(): void {
        this.back.emit();
    }
}
