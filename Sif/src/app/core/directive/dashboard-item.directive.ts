import { Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { DashboardItemComponent } from '../baseClass';

@Directive({
  selector: '[dashboardItem]'
})
export class DashboardItemDirective {
  private isViewCreated = false;

  constructor(private viewContainerRef: ViewContainerRef) { }

    @Input('dashboardItem') set Component(component: Type<DashboardItemComponent>) {
      if(!component) {
        return;
      }

      if(!this.isViewCreated) {
        this.viewContainerRef.createComponent(component);
        this.isViewCreated = true;
      }
    }
}
