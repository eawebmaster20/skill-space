import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CvaComponent } from "../../../core/shared/cva/cva.component";
import { TextareaCvaComponent } from "../../../core/shared/textarea-cva/textarea-cva.component";
import { LoaderComponent } from "../../../core/shared/loader/loader.component";
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-program-creation',
  standalone: true,
  imports: [CvaComponent, TextareaCvaComponent, LoaderComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './program-creation.component.html',
  styleUrl: './program-creation.component.scss'
})
export class ProgramCreationComponent {
  isLoading = false;
  createProgram!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.createProgram = this.fb.group({
      name: ['test name', Validators.required],
      description: ['a very long description', Validators.required],
      requirement: ['CV, Profile', Validators.required],
      requiredEarnedBadges: ['javascript, react', Validators.required],
      additionalEarnedBadges: ['vue'],
      dateOfCommencement: ['', Validators.required],
      dateOfCompletion: ['', Validators.required],
      isDraft:[false]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;  // Store the selected file
    }
  }
  ngOnInit() {
    // Initially disable the "Publish" button
    this.createProgram.statusChanges.subscribe((status) => {
      const publishButton = document.getElementById('btn-publish') as HTMLButtonElement;
      if (status === 'VALID') {
        publishButton.disabled = false;
      } else {
        publishButton.disabled = true;
      }
    });
  }

  submit(){
    if (this.selectedFile) {
      const formData = new FormData();
      console.log(this.createProgram.value);
      Object.keys(this.createProgram.controls).forEach(key => {
        formData.append(key, this.createProgram.get(key)?.value);
      });
      formData.append('coverImageForProgram', this.selectedFile);
      this.api.createProgram(formData).subscribe({
        next:(res)=>console.log(res),
        error:(err)=>console.error(err)
      })
      // formData.forEach((value, key) => {
      //   console.log(key);
      //   console.log(value);
      //   console.log(" ");
      // });
    } else {
      console.error('Form is invalid or file is missing');
    }
  }
}
