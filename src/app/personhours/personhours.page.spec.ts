import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonhoursPage } from './personhours.page';

describe('PersonhoursPage', () => {
  let component: PersonhoursPage;
  let fixture: ComponentFixture<PersonhoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonhoursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonhoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
