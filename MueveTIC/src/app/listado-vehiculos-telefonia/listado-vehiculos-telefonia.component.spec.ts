import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoVehiculosTelefoniaComponent } from './listado-vehiculos-telefonia.component';

describe('ListadoVehiculosTelefoniaComponent', () => {
  let component: ListadoVehiculosTelefoniaComponent;
  let fixture: ComponentFixture<ListadoVehiculosTelefoniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoVehiculosTelefoniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoVehiculosTelefoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
