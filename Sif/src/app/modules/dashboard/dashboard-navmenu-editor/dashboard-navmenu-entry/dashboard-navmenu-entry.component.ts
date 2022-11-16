import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavMenu } from 'src/app/core';
import { faTrash, faSave, faUndo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
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

  public trashIcon = faTrash;
  public saveIcon = faSave;
  public abortIcon = faUndo;
  public removeIcon = faTimes;


  public navMenuForm = new FormGroup({
    displayText: new FormControl(''),
    selectedParent: new FormControl(0)
  });

  constructor( private navMenuService: NavmenuService) {

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

  public saveChanges() {
    this.navMenuService.updateNavMenuEntry(this.navMenuEntry);
  }

  public deleteEntry() {
    this.navMenuService.deleteNavMenuEnty(this.navMenuEntry.navmenuId);
  }

  public abortEdit() {
    this.navMenuService.abortEdit(this.navMenuEntry.navmenuId);
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
