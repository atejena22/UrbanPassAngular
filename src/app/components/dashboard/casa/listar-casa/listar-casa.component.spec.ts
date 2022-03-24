import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCasaComponent } from './listar-casa.component';

describe('ListarCasaComponent', () => {
  let component: ListarCasaComponent;
  let fixture: ComponentFixture<ListarCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
