import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupResetPassswordComponent } from './popup-reset-passsword.component';

describe('PopupResetPassswordComponent', () => {
  let component: PopupResetPassswordComponent;
  let fixture: ComponentFixture<PopupResetPassswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupResetPassswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupResetPassswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
