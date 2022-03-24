import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxUserComponent } from './max-user.component';

describe('MaxUserComponent', () => {
  let component: MaxUserComponent;
  let fixture: ComponentFixture<MaxUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
