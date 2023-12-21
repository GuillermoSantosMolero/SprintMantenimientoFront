import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReservaTelefoniaComponent } from './modificar-reserva-telefonia.component';

describe('ModificarReservaTelefoniaComponent', () => {
  let component: ModificarReservaTelefoniaComponent;
  let fixture: ComponentFixture<ModificarReservaTelefoniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarReservaTelefoniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarReservaTelefoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
