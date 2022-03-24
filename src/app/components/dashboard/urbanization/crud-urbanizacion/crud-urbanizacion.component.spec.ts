import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUrbanizacionComponent } from './crud-urbanizacion.component';

describe('CrudUrbanizacionComponent', () => {
  let component: CrudUrbanizacionComponent;
  let fixture: ComponentFixture<CrudUrbanizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudUrbanizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUrbanizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
