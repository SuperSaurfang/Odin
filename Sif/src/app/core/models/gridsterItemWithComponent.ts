import { Type } from "@angular/core";
import { GridsterItem } from "angular-gridster2";
import { DashboardItemComponent } from "../baseClass";

export interface GridsterItemWithComponent extends GridsterItem {
    component?: Type<DashboardItemComponent>
}