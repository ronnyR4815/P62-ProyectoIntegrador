import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarComponent } from './actualizar.component';

describe('ActualizarComponent', () => {
  let component: ActualizarComponent;
  let fixture: ComponentFixture<ActualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarComponent]
    });
    fixture = TestBed.createComponent(ActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
