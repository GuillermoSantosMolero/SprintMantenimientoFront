import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonicoComponent } from './telefonico.component';

describe('TelefonicoComponent', () => {
  let component: TelefonicoComponent;
  let fixture: ComponentFixture<TelefonicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelefonicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelefonicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
