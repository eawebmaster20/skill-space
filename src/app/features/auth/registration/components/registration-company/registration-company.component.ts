import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CvaComponent } from '../../../../../core/shared/cva/cva.component';
import { ToastComponent } from '../../../../../core/shared/toast/toast.component';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthRegisterService } from '../../../../../core/services/Auth/register/auth-register.service';
import { DataService } from '../../../../../core/services/data/data.service';
import { ActivatePasswordComponent } from '../../../activate-password/activate-password.component';

@Component({
  selector: 'app-registration-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CvaComponent,
    ToastComponent,
    RouterLink,
  ],
  templateUrl: './registration-company.component.html',
  styleUrl: './registration-company.component.scss',
})
export class RegistrationCompanyComponent {
  companyForm!: FormGroup;
  toastMessages: { [key: string]: { message: string; type: string } } = {};

  // Store selected files separately from form controls
  selectedFiles: { [key: string]: File | null } = {
    certificate: null,
    logo: null,
  };

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthRegisterService
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group(
      {
        name: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]+$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        website: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contact: ['', Validators.required],
        // Removed 'certificate' and 'logo' from form controls
      },
      { validator: this.passwordMatchValidator }
    );

    this.companyForm.valueChanges.subscribe(() => {
      this.updateToastMessages();
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onFileSelected(event: Event, controlName: 'certificate' | 'logo') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFiles[controlName] = file;
    }
  }

  submitCompanyForm() {
    if (this.companyForm.valid) {
      const formData = new FormData();

      // Append form controls data
      Object.keys(this.companyForm.controls).forEach((key) => {
        const control = this.companyForm.get(key);
        if (control?.value) {
          formData.append(key, control.value);
        }
      });

      // Append files from selectedFiles
      Object.keys(this.selectedFiles).forEach((key) => {
        const file = this.selectedFiles[key];
        if (file) {
          formData.append(key, file, file.name);
        }
      });

      this.authService.registerCompany(formData).subscribe({
        next: (response) => {
          console.log('Company registered successfully:', response);
          this.companyForm.reset();
          this.clearToastMessages();
          this.openDialog();
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.toastMessages['general'] = {
            message: 'Registration failed. Please try again.',
            type: 'error',
          };
        },
      });
    } else {
      this.companyForm.markAllAsTouched();
      this.updateToastMessages();
    }
  }

  private updateToastMessages() {
    this.toastMessages = {};

    for (const controlName in this.companyForm.controls) {
      const control = this.companyForm.get(controlName);
      if (control && control.invalid && (control.touched || control.dirty)) {
        if (controlName === 'name') {
          this.toastMessages['name'] = {
            message: 'Company name is required.',
            type: 'error',
          };
        }
        if (controlName === 'email') {
          if (control.errors?.['required']) {
            this.toastMessages['email'] = {
              message: 'Email is required.',
              type: 'error',
            };
          } else if (control.errors?.['email']) {
            this.toastMessages['email'] = {
              message: 'Invalid email format.',
              type: 'error',
            };
          }
        }
        if (controlName === 'password') {
          if (control.errors?.['required']) {
            this.toastMessages['password'] = {
              message: 'Password is required.',
              type: 'error',
            };
          } else if (control.errors?.['minlength']) {
            this.toastMessages['password'] = {
              message: 'Passwords must be at least 8 characters. ',
              type: 'error',
            };
          } else if (control.errors?.['pattern']) {
            this.toastMessages['password'] = {
              message:
                'Passwords must be at least 8 characters with a mix of upper case, lower case, and special characters.',
              type: 'warn',
            };
          }
        }
        if (controlName === 'confirmPassword') {
          if (control.errors?.['mismatch']) {
            this.toastMessages['confirmPassword'] = {
              message: 'Passwords do not match.',
              type: 'error',
            };
          }
        }
        if (controlName === 'website') {
          this.toastMessages['website'] = {
            message: 'Website is required.',
            type: 'error',
          };
        }
        if (controlName === 'contact') {
          this.toastMessages['contact'] = {
            message: 'Contact information is required.',
            type: 'error',
          };
        }
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ActivatePasswordComponent, {});

    dialogRef.afterClosed().subscribe((result) => {});
  }

  clearToastMessages() {
    this.toastMessages = {};
  }
}
