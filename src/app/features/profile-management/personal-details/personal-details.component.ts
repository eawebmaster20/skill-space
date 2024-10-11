import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CvaComponent } from '../../../core/shared/cva/cva.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CustomCheckBoxComponent } from '../../../core/shared/custom-check-box/custom-check-box.component';
import { ModalComponentsComponent } from '../../../core/shared/modal-components/modal-components.component';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CvaComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    CustomCheckBoxComponent,
    ModalComponentsComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDetailsComponent {
  PersonalDetails!: FormGroup;
  uploadedProfilePictureUrl: string | null = null;
  uploadedCVUrl: string | null = null;
  showModal = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.createForm();
  }

  createForm() {
    this.PersonalDetails = this.fb.group({
      profilePicture: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      introduction: ['', [Validators.required, Validators.maxLength(250)]],
      cv: [null],
      dateOfBirth: [null, Validators.required],
      nationality: ['', Validators.required],
      currentLocation: ['', Validators.required],
      phone: ['', Validators.required],
      phoneVisibility: [false, Validators.required],
      socialMediaHandles: this.fb.array([this.fb.control('')]),
      portfolioLinks: this.fb.array([this.fb.control('')]),
    });
  }

  onFileSelect(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      if (controlName === 'profilePicture') {
        this.uploadedProfilePictureUrl = fileUrl;
      } else if (controlName === 'cv') {
        this.uploadedCVUrl = fileUrl;
      }

      // Set the file in the form control
      this.PersonalDetails.get(controlName)?.setValue(file);
    }
  }

  // Getters for form arrays
  get socialMedia(): FormArray {
    return this.PersonalDetails.get('socialMediaHandles') as FormArray;
  }

  get portfolioLinks(): FormArray {
    return this.PersonalDetails.get('portfolioLinks') as FormArray;
  }

  // Methods to add/remove controls
  addSocialMedia() {
    this.socialMedia.push(this.fb.control(''));
  }

  removeSocialMedia(index: number) {
    this.socialMedia.removeAt(index);
  }

  addPortfolioLink() {
    this.portfolioLinks.push(this.fb.control(''));
  }

  removePortfolioLink(index: number) {
    this.portfolioLinks.removeAt(index);
  }

  private convertToFormData(formGroup: FormGroup): FormData {
    const formData = new FormData();

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormArray) {
        control.controls.forEach((value, index) => {
          formData.append(`${key}[${index}]`, value.value);
        });
      } else if (key === 'profilePicture' || key === 'cv') {
        if (control?.value) {
          formData.append(key, control.value);
        }
      } else {
        formData.append(key, control?.value);
      }
    });

    return formData;
  }

  // Form submission
  onSubmit() {
    if (this.PersonalDetails.valid) {
      const formData = this.convertToFormData(this.PersonalDetails);
      this.apiService
        .updateProfile(formData)
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => console.error(err),
        });
    } else {
      console.error('Form is invalid');
    }
  }

  // Cancel changes
  cancel() {
    this.PersonalDetails.reset();
  }

  onShowModal() {
    this.showModal = !this.showModal;
  }
}
