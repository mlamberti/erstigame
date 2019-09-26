import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RallyepointsPage } from './rallyepoints.page';

describe('RallyepointsPage', () => {
  let component: RallyepointsPage;
  let fixture: ComponentFixture<RallyepointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RallyepointsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RallyepointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
