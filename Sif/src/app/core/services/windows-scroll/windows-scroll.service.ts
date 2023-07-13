import { Injectable } from '@angular/core';
import { fromEvent, interval, Observable } from 'rxjs';
import { throttle, map } from 'rxjs/operators';

export interface Position {
  scrollY: number,
  scrollX: number,
}


@Injectable()
export class WindowsScrollService {

  private scrollEventSubject: Observable<Event>;

  constructor() {
    this.scrollEventSubject = fromEvent(window, 'scroll')
  }

  public scrolled(tick = 10): Observable<Position> {
    return this.scrollEventSubject.pipe(
      throttle(event => interval(tick)),
      map(event => this.getPosition(event))
    );
  }

  getPosition(event: Event): Position {
    if(event.type !== 'scroll') return;

    return {
      scrollY: window.scrollY,
      scrollX: window.scrollX
    }
  }

}
