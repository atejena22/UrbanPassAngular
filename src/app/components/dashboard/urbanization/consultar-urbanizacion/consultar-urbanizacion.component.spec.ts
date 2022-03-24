import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarUrbanizacionComponent } from './consultar-urbanizacion.component';

describe('ConsultarUrbanizacionComponent', () => {
  let component: ConsultarUrbanizacionComponent;
  let fixture: ComponentFixture<ConsultarUrbanizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarUrbanizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarUrbanizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
