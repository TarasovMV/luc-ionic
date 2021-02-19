import {Subject} from 'rxjs';
import {Directive, OnDestroy} from '@angular/core';

/**
 * use for takeUntil(unsubscribe$)
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export class RxJsUnsubscriber implements OnDestroy{
    protected unsubscribe$: Subject<void> = new Subject<void>();

    constructor() {}

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
