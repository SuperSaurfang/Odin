/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagResultComponent } from './tag-result.component';

describe('TagResultComponent', () => {
  let component: TagResultComponent;
  let fixture: ComponentFixture<TagResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
