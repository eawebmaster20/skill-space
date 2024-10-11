import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTrackingComponent } from './application-tracking.component';

describe('ApplicationDetailComponent', () => {
  let component: ApplicationTrackingComponent;
  let fixture: ComponentFixture<ApplicationTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
