import { CdkDropList } from '@angular/cdk/drag-drop';
import { Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragDropManagerService } from '../services/drag-drop-manager.service';

@Directive({
  selector: '[dragDropManager]'
})
export class DragDropManagerDirective {
  private manager!: Subscription;
  constructor(
    private dropList: CdkDropList,
    private managerService: DragDropManagerService
  ) {}

  ngOnInit(): void {
    this.managerService.register(this.dropList.id);
    this.manager = this.managerService.onListChange().subscribe((x) => {
      this.dropList.connectedTo = x;
    });
  }

  ngOnDestroy(): void {
    this.manager.unsubscribe();
  }

}

@Directive({
  selector: '[dragDropManagerRoot]',
  providers: [
    {
      provide: DragDropManagerService,
    },
  ],
})
export class DragAndDropManagerRootDirective extends DragDropManagerDirective {}
