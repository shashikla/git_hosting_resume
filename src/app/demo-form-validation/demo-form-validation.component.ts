import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo-form-validation',
  templateUrl: './demo-form-validation.component.html',
  styleUrls: ['./demo-form-validation.component.scss']
})
export class DemoFormValidationComponent {
  userDataForm! : FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userDataForm = this.formBuilder.group({
      educationDetails: this.formBuilder.array([]) // Initialize as an empty array initially
    });
  }

  // Function to create an education detail form group
  createEducationDetail(): FormGroup {
    return this.formBuilder.group({
      Degree: ['', Validators.required],
      Institution: ['', Validators.required],
      Location: ['', Validators.required],
      Graduation_Date: ['', Validators.required]
    });
  }

  // Function to add a new education detail
  addEducationDetail(): void {
    const educationDetails = this.userDataForm.get('educationDetails') as FormArray;
    educationDetails.push(this.createEducationDetail());
  }

  // Function to remove an education detail
  removeEducationDetail(index: number): void {
    const educationDetails = this.userDataForm.get('educationDetails') as FormArray;
    educationDetails.removeAt(index);
  }

  // Function to submit data
  submitData(): void {
    if (this.userDataForm.valid) {
      // Submit the valid form
      console.log('Form is valid. Submitting data:', this.userDataForm.value);
      // Perform your data submission logic here
    } else {
      // Handle invalid form
      console.log('Form is invalid. Please check the fields.');
    }
  }

}
