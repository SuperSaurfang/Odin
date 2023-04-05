import { Component, OnInit } from '@angular/core';
import { DashboardItemComponent } from 'src/app/core';

@Component({
  selector: 'app-dashboard-quick-create',
  templateUrl: './dashboard-quick-create.component.html',
  styleUrls: ['./dashboard-quick-create.component.scss']
})
export class DashboardQuickCreateComponent extends DashboardItemComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit() {
    
  }

}
