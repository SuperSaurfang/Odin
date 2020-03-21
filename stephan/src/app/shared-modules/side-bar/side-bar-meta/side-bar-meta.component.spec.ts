import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMetaComponent } from './side-bar-meta.component';

describe('SideBarMetaComponent', () => {
  let component: SideBarMetaComponent;
  let fixture: ComponentFixture<SideBarMetaComponent>;

  beforeEach(async(() => {
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
