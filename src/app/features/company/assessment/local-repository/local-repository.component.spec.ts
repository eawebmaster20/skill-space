import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRepositoryComponent } from './local-repository.component';

describe('LocalRepositoryComponent', () => {
  let component: LocalRepositoryComponent;
  let fixture: ComponentFixture<LocalRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalRepositoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
