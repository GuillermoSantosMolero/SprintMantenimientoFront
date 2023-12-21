import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarReservaTelefoniaComponent } from './cancelar-reserva-telefonia.component';

describe('CancelarReservaTelefoniaComponent', () => {
  let component: CancelarReservaTelefoniaComponent;
  let fixture: ComponentFixture<CancelarReservaTelefoniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarReservaTelefoniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelarReservaTelefoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
