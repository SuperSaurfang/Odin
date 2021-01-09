import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SideBarMetaComponent } from './side-bar-meta.component';

describe('SideBarMetaComponent', () => {
  let component: SideBarMetaComponent;
  let fixture: ComponentFixture<SideBarMetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
