import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';

interface User {
  Name: string;
  Details: {
    [key: string]: string;
  };
}

@Component({
  selector: 'app-form-resume',
  templateUrl: './form-resume.component.html',
  styleUrls: ['./form-resume.component.scss']
})
export class FormResumeComponent {

  constructor(private route: ActivatedRoute,
    private userService: UserDataService) {

  }
  userData: any = {
    Details: {
      Contact: {
        Email: '',
        LinkedIn_Profile: ''
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
          Responsibilities: ['']
        }
      ]
    }
  };
  resumeDetails: any;
  name: string = "";
  showNewEducationInput = false;
  newResponsibility: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userName = (params['name']).toLowerCase();
      this.name = userName.toUpperCase();
      this.userService.getDataByUser(userName).subscribe((user) => {
        console.log({ user: user });
        this.resumeDetails = user.find((ele: any) => {
          return ele;
        });
      });
    });
  }

  submitData() {
    console.log(this.userData);

    // this.userService.addData(this.userData)
  }
  addNewEducation(value: any) {
    console.log(this.userData.Details.Education[value]);

    this.userData.Details.Education.push({
      Degree: '',
      Institution: '',
      Location: '',
      Graduation_Date: ''
    })
  }
  addNewExperience(value: any) {
    console.log(this.userData.Details.Work_Experience[value]);
    this.userData.Details.Work_Experience.push({
      Job_role: '',
      Company: '',
      Location: '',
      Dates_of_Employment: '',
      Responsibilities: []
    })
  }
  addNewResponsibility(value: any) {
    console.log("****",value);
    
    value.Responsibilities.push('');
    this.newResponsibility = '';
  }

  remove(value: any) {
    this.userData.Details.Education.splice(value, 1);
  }

  deleteResponsibility(index: any) {
    this.userData.Details.Work_Experience.Responsibilities.splice(index, 1);
  }

}
