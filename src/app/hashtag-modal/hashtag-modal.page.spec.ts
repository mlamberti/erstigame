import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagModalPage } from './hashtag-modal.page';

describe('HashtagModalPage', () => {
  let component: HashtagModalPage;
  let fixture: ComponentFixture<HashtagModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
