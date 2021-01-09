import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SideBarSearchComponent } from './side-bar-search.component';

describe('SideBarSearchComponent', () => {
  let component: SideBarSearchComponent;
  let fixture: ComponentFixture<SideBarSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
