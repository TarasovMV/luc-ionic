import {Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';

/**
 * use for takeUntil(unsubscribe$)
 */
export class RxJsUnsubscriber implements OnDestroy{
    protected unsubscribe$: Subject<void> = new Subject<void>();

    constructor() {}

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
