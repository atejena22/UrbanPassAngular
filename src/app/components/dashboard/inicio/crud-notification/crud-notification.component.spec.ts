import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNotificationComponent } from './crud-notification.component';

describe('CrudNotificationComponent', () => {
  let component: CrudNotificationComponent;
  let fixture: ComponentFixture<CrudNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
