import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class UnsubscribeHook implements OnDestroy {
  protected unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
