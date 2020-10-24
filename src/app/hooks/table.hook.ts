import { UnsubscribeHook } from './unsubscribe.hook';
import { Subject, Observable } from 'rxjs';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { takeUntil, switchMap, tap, take } from 'rxjs/operators';

export abstract class TableHook<T> extends UnsubscribeHook implements OnInit {
  loading = false;
  list: T[] = [];
  protected refresh$ = new Subject<void>();

  constructor(
    protected service: any,
    protected cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.refresh$
      .pipe(takeUntil(this.unsubscribe$), switchMap(this.getList))
      .subscribe();
    this.refresh();
  }

  private getList = (): Observable<T[]> => {
    this.loading = true;

    return this.service
      .getList()
      .pipe(takeUntil(this.unsubscribe$), tap(this.setList));
  }

  protected refresh(): void {
    this.refresh$.next();
  }

  private setList = (res: T[]): void => {
    this.list = res;
    this.loading = false;

    this.cd.detectChanges();
  }

  openModal(id: string = null): void {}

  delete(item: T): void {}

  protected add(rate: T): Observable<T> {
    this.loading = true;

    return this.service.add(rate).pipe(take(1));
  }

  protected edit(rate: T): Observable<T> {
    this.loading = true;

    return this.service.edit(rate).pipe(take(1));
  }

  protected deleteRequest(id: string): void {
    this.loading = true;

    this.service.delete(id)
      .pipe(take(1))
      .subscribe(() => this.refresh());
  }
}
