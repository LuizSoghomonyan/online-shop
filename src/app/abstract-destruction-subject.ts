import { Directive, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

@Directive()
export abstract class AbstractDestructionSubject implements OnDestroy {
  protected destroySubject$: Subject<void> = new Subject<void>()

  public ngOnDestroy(): void {
    this.destroySubject$.next()
    this.destroySubject$.complete()
  }
}
