import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RallyePage } from './rallye.page';

describe('RallyePage', () => {
  let component: RallyePage;
  let fixture: ComponentFixture<RallyePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RallyePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RallyePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
