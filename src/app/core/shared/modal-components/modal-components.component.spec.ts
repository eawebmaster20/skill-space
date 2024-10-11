import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponentsComponent } from './modal-components.component';

describe('ModalComponentsComponent', () => {
  let component: ModalComponentsComponent;
  let fixture: ComponentFixture<ModalComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
