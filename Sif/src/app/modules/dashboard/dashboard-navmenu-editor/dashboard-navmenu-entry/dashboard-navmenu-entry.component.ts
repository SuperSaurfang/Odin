import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { NavMenu } from 'src/app/core';
import { faChevronDown, faChevronUp, faTrash, faSave, faUndo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup} from '@angular/forms';
import { NavmenuService } from '../../services';

@Component({
  selector: 'app-dashboard-navmenu-entry',
  templateUrl: './dashboard-navmenu-entry.component.html',
  styleUrls: ['./dashboard-navmenu-entry.component.scss']
})
export class DashboardNavmenuEntryComponent implements OnInit, OnChanges {

  @Input()
  navMenuEntry: NavMenu;

  public parentSelectionList: NavMenu[] = [];

  public children: NavMenu[] = [];

  public currentExpandIcon = faChevronDown;
  public trashIcon = faTrash;
  public saveIcon = faSave;
  public abortIcon = faUndo;
  public removeIcon = faTimes;

  public isExpanded = false;

  readonly baseUrl: String;

  public navMenuForm = new FormGroup({
    displayText: new FormControl(''),
    selectedParent: new FormControl(0)
  });

  constructor(private location: Location, private navMenuService: NavmenuService) {
    const route = this.location.path();
    const url = window.location.href;
    this.baseUrl = url.replace(route, '');
   }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['navMenuEntry'] && changes['navMenuEntry'].firstChange) {
      this.setFormValue();
    }
  }

  private setFormValue() {
    const displayText = '' || this.navMenuEntry.displayText;
    this.navMenuForm.controls['displayText'].setValue(displayText);

    const parentId = this.navMenuEntry.parentId;
    this.navMenuForm.controls['selectedParent'].setValue(parentId);
  }


  ngOnInit() {
    this.navMenuService.getNavMenuChildren(this.navMenuEntry.navmenuId).subscribe(children => {
      this.children = children;
    });
    this.navMenuService.getNavMenuParent(this.navMenuEntry.navmenuId).subscribe(list => {
      this.parentSelectionList = list;
    });
  }

  public expand() {
    if (this.currentExpandIcon === faChevronDown) {
      this.currentExpandIcon = faChevronUp;
      this.isExpanded = true;
    } else {
      this.currentExpandIcon = faChevronDown;
      this.isExpanded = false;
    }
  }

  public saveChanges() {
    this.navMenuService.saveNavMenuEntry(this.navMenuEntry);
    this.expand();
  }

  public deleteEntry() {
    this.navMenuService.deleteNavMenuEnty(this.navMenuEntry.navmenuId);
    this.expand();
  }

  public abortEdit() {
    this.navMenuService.abortEdit(this.navMenuEntry.navmenuId);
    this.expand();
  }

  public removeParent() {
    this.navMenuService.removeParent(this.navMenuEntry.navmenuId);
  }

  public setParent() {
    const parentId = this.navMenuForm.controls['selectedParent'].value;
    this.navMenuService.setParent(this.navMenuEntry.navmenuId, parentId);
  }

  public onDisplayTextChange(event: any) {
    this.navMenuEntry.displayText = event.target.value;
  }


}
