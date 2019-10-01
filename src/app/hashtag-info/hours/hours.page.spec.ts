import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursPage } from './hours.page';

describe('HoursPage', () => {
  let component: HoursPage;
  let fixture: ComponentFixture<HoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
