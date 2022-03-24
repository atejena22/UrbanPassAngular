import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCasaComponent } from './crud-casa.component';

describe('CrudCasaComponent', () => {
  let component: CrudCasaComponent;
  let fixture: ComponentFixture<CrudCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
