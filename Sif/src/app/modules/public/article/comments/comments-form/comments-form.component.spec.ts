import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommentsFormComponent } from './comments-form.component';

describe('CommentsFormComponent', () => {
  let component: CommentsFormComponent;
  let fixture: ComponentFixture<CommentsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
