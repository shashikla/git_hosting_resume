import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';


interface User {
  Name: string;
  Details: {
    [key: string]: string;
  };
}

@Component({
  selector: 'app-form-resume',
  templateUrl: './form-resume.component.html',
  styleUrls: ['./form-resume.component.scss'],
})
export class FormResumeComponent {
  formSubmit: boolean = false;

  constructor(private route: ActivatedRoute,
    private userService: UserDataService, private router:Router, private formBuilder:FormBuilder, private snackBar:MatSnackBar) {
  }

  technologies: string[] = [];
  skills: string[] = [];
  responsibilities: string[] = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [13, 188];
  ngForm! : FormGroup;

  // email = new FormControl('', [Validators.required, Validators.email]);

  userData: any = {
    Name: '',
    Description: '',
    Current_role: '',
    Details: {
      Contact: {
        Email: '',
        LinkedIn_Profile: '',
        Phone:''
      },
      Education: [{
        Degree: '',
        Institution: '',
        Location: '',
        Graduation_Date: ''
      }],
      Work_Experience: [
        {
          Job_role: '',
          Company: '',
          Location: '',
          Dates_of_Employment: '',
          Responsibilities: this.responsibilities
        }
      ],
      Technologies: this.technologies,
      Skills: this.skills,
      Certification: [
        {
          Certification_Name: '',
          Certifying_Body: '',
          Date_of_Certification: ''
        }
      ],
    }
  };
  resumeDetails: any;
  name: string = "";
  showNewEducationInput = false;
  newResponsibility: string = '';
  newTechnology: string = '';

  ngOnInit() {
    this.ngForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Current_role: ['', Validators.required],
      Details: this.formBuilder.group({
        Degree: ['', Validators.required],
        Institution: ['', Validators.required],
        Location: ['', Validators.required],
        Graduation_Date: ['', Validators.required]
      })
    })
  }

  createEducationDetail(): FormGroup {
    return this.formBuilder.group({
      Degree: ['', Validators.required],
      Institution: ['', Validators.required],
      Location: ['', Validators.required],
      Graduation_Date: ['', Validators.required]
    });
  }

  addEducationDetail(): void {
    const educationDetails = this.ngForm.get('educationDetails') as FormArray;
    educationDetails.push(this.createEducationDetail());
  }

  showSnackbarTopPosition(content:any, action:any, duration:any) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-style'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  save(){
    this.formSubmit = true;
    // if(this.ngForm.valid){
    // }else{
    //   console.log("Missing Data ..");
    //   this.showSnackbarTopPosition("Fill the required Data","Done",1000)
    // }
  }

  submitData(event: Event) {
    event.preventDefault();
    this.save();
    // this.userData.Details.Work_Experience.map((ele)=>{
    //   // console.log(ele.Responsibilities.split('.').map((sentence:any) => sentence.trim()).filter((sentence:any) => sentence !== ''));
    //   return ele.Responsibilities?.split('.').map((sentence:any) => sentence.trim()).filter((sentence:any) => sentence !== '');
    // });
    // this.formSubmit = true;

    // data.split('.').map((sentence:any) => sentence.trim()).filter((sentence:any) => sentence !== '');
    // this.userService.addData(this.userData).subscribe(
    //   response => {
    //     // Handle successful response
    //     console.log('Response:', response);
    //     this.formSubmit = true
    //   },
    //   error => {
    //     // Handle error
    //     console.error('Error:', error);
    //   }
    // );
    // console.log(this.userData);

  }


  openNewInput(value:any){
    if(value == "Education"){
      this.userData.Details.Education.push({
        Degree: '',
        Institution: '',
        Location: '',
        Graduation_Date: ''
      })
    }else if(value == "Certifications"){
      this.userData.Details.Certification.push({
        Certification_Name: '',
        Certifying_Body: '',
        Date_of_Certification: ''
      })
    }else if(value == "work-experience"){
      this.userData.Details.Work_Experience.push({
        Job_role: '',
        Company: '',
        Location: '',
        Dates_of_Employment: '',
        Responsibilities: this.responsibilities
      })
    }
  }
  // addNewEducation() {
  //   this.userData.Details.Education.push({
  //     Degree: '',
  //     Institution: '',
  //     Location: '',
  //     Graduation_Date: ''
  //   })
  // }

  addNewExperience(value: any) {
    console.log(this.userData.Details.Work_Experience[value]);
    this.userData.Details.Work_Experience.push({
      Job_role: '',
      Company: '',
      Location: '',
      Dates_of_Employment: '',
      Responsibilities: this.newResponsibility
    })
  }

  // addNewCertificate(value: any) {
  //   console.log("value",value);
  //   this.userData.Details.Certification.push({
  //     Certification_Name: '',
  //     Certifying_Body: '',
  //     Date_of_Certification: ''
  //   })
  // }
  content: string = ''; // Variable to store textarea content
  contentArray: string[] = []; 

  addNewResponsibility(value:any) {
  this.content = value;
  this.content = value.split('.').map((sentence:any) => sentence.trim()).filter((sentence:any) => sentence !== '');
  console.log(this.content);
  }
  remove(value: any) {
    this.userData.Details.Education.splice(value, 1);
  }
  removeCertification(value: any) {
    this.userData.Details.Certification.splice(value, 1);
  }

  deleteResponsibility(index: any) {
    this.userData.Details.Work_Experience.Responsibilities.splice(index, 1);
  }

  addTechnology(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    value = value
      .toLowerCase()
      .split(' ')
      .map(word => word.toUpperCase())
      .join(' ');

    if (value) {
      console.log(value);
      
      this.technologies.push(value);
    }
    event.chipInput!.clear();
  }

  clearInput(input: any): void {
    input.value = '';
    this.newTechnology = '';
  }

  removeTechnology(tech: string): void {
    const index = this.technologies.indexOf(tech);
    if (index !== -1) {
      this.technologies.splice(index, 1);
    }
  }

  addSkillTechnology(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    value = value.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    if (value) {
      this.skills.push(value);
    }
    event.chipInput!.clear();
  }
  removeSkillTechnology(tech: string): void {
    const index = this.skills.indexOf(tech);
    if (index !== -1) {
      this.skills.splice(index, 1);
    }
  }
  showForm(e:any){
    // console.log("name here..", e);
    this.userService.getDataByUser(e).subscribe((user)=>{
      console.log({user:user.length});
      if(user.length > 1){
        this.router.navigate(['/resume-card',e])
      }
    });
    // this.userService.getAllData().subscribe((data) => {
    //   data.find((ele)=>{
    //    console.log(ele);
    //     if((ele.Name).toLowerCase() === (e).toLowerCase()){
    //       // this.router.navigate(['/details',e])
    //     }
    //   })     
      
    // })
    //   this.userdata = data;
    //     const result = this.userdata.find((ele)=>{
    //       console.log(ele)
    //       if((ele.Name).toLowerCase() === (e.name).toLowerCase()){
    //       this.router.navigate(['/details',ele.Name]);
    //       }
    //       else{
    //         this.showSnackbarTopPosition('User Not Found','Done','1000');
    //       }
    //       })
    //  });
    // this.showName(e.name);
    // 
  }
}
