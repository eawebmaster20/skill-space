import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalDetailsComponent } from './personal-details.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PersonalDetailsComponent', () => {
  let component: PersonalDetailsComponent;
  let fixture: ComponentFixture<PersonalDetailsComponent>;

  beforeEach(async () => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        PersonalDetailsComponent,
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls', () => {
    expect(component.PersonalDetails.contains('firstName')).toBeTruthy();
    expect(component.PersonalDetails.contains('lastName')).toBeTruthy();
    expect(component.PersonalDetails.contains('introduction')).toBeTruthy();
    expect(component.PersonalDetails.contains('dateOfBirth')).toBeTruthy();
    expect(component.PersonalDetails.contains('nationality')).toBeTruthy();
    expect(component.PersonalDetails.contains('currentLocation')).toBeTruthy();
    expect(component.PersonalDetails.contains('phone')).toBeTruthy();
    expect(component.PersonalDetails.contains('phoneVisibility')).toBeTruthy();
    expect(
      component.PersonalDetails.contains('socialMediaHandles')
    ).toBeTruthy();
    expect(component.PersonalDetails.contains('portfolioLinks')).toBeTruthy();
  });

  it('should mark required fields as invalid when empty', () => {
    const firstName = component.PersonalDetails.get('firstName');
    firstName?.setValue('');
    expect(firstName?.valid).toBeFalsy();

    const lastName = component.PersonalDetails.get('lastName');
    lastName?.setValue('');
    expect(lastName?.valid).toBeFalsy();
  });

  it('should validate introduction max length', () => {
    const introduction = component.PersonalDetails.get('introduction');
    introduction?.setValue('a'.repeat(251));
    expect(introduction?.valid).toBeFalsy();

    introduction?.setValue('a'.repeat(250));
    expect(introduction?.valid).toBeTruthy();
  });

  it('should add and remove social media handles', () => {
    expect(component.socialMedia.length).toBe(1);
    component.addSocialMedia();
    expect(component.socialMedia.length).toBe(2);
    component.removeSocialMedia(0);
    expect(component.socialMedia.length).toBe(1);
  });

  it('should add and remove portfolio links', () => {
    expect(component.portfolioLinks.length).toBe(1);
    component.addPortfolioLink();
    expect(component.portfolioLinks.length).toBe(2);
    component.removePortfolioLink(0);
    expect(component.portfolioLinks.length).toBe(1);
  });

  it('should handle file selection for profile picture', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as unknown as Event;
    component.onFileSelect(event, 'profilePicture');
    expect(component.uploadedProfilePictureUrl).toBe('mocked-url');
    expect(component.PersonalDetails.get('profilePicture')?.value).toBe(file);
  });

  it('should handle file selection for CV', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });
    const event = { target: { files: [file] } } as unknown as Event;
    component.onFileSelect(event, 'cv');
    expect(component.uploadedCVUrl).toBe('mocked-url');
    expect(component.PersonalDetails.get('cv')?.value).toBe(file);
  });

  it('should convert form to FormData on submit', () => {
    const formData = new FormData();
    const consoleSpy = jest.spyOn(console, 'log');
    component.PersonalDetails.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      introduction: 'Test introduction',
      dateOfBirth: new Date(),
      nationality: 'US',
      currentLocation: 'New York',
      phone: '1234567890',
      phoneVisibility: true,
    });
    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalled();
    const lastCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];
    expect(lastCall).toHaveProperty('firstName', 'John');
    expect(lastCall).toHaveProperty('lastName', 'Doe');
  });

  it('should reset form on cancel', () => {
    component.PersonalDetails.patchValue({
      firstName: 'John',
      lastName: 'Doe',
    });
    component.cancel();
    expect(component.PersonalDetails.get('firstName')?.value).toBeNull();
    expect(component.PersonalDetails.get('lastName')?.value).toBeNull();
  });
});
