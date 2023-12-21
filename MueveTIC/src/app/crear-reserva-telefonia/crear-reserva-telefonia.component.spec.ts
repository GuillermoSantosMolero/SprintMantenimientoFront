import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearReservaTelefoniaComponent } from './crear-reserva-telefonia.component';

describe('CrearReservaTelefoniaComponent', () => {
  let component: CrearReservaTelefoniaComponent;
  let fixture: ComponentFixture<CrearReservaTelefoniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearReservaTelefoniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearReservaTelefoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
