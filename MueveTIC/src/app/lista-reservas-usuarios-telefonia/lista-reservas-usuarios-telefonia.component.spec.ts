import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReservasUsuariosTelefoniaComponent } from './lista-reservas-usuarios-telefonia.component';

describe('ListaReservasUsuariosTelefoniaComponent', () => {
  let component: ListaReservasUsuariosTelefoniaComponent;
  let fixture: ComponentFixture<ListaReservasUsuariosTelefoniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReservasUsuariosTelefoniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaReservasUsuariosTelefoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
