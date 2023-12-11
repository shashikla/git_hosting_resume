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

  constructor(private route:ActivatedRoute,
              private userService:UserDataService){

  }
  userData: any = {
    Details:{
      Contact:{
        Email : '',
        LinkedIn_Profile:''
      },
      Education:[],
      Work_Experience:[
        {
          Job_role:'',
          Company:'',
          Location:'',
          Dates_of_Employment:'',
          Responsibilities:[]
        }
      ]
    }
  };
  resumeDetails: any;
  name: string = "";

 ngOnInit(){
  this.route.params.subscribe(params => {
    const userName = (params['name']).toLowerCase();
    this.name = userName.toUpperCase();
    this.userService.getDataByUser(userName).subscribe((user)=>{
      console.log({user:user});
      this.resumeDetails = user.find((ele:any)=>{
        return ele;
      });
    });
  });
 }

 submitData(){
 console.log(this.userData);
 
  // this.userService.addData(this.userData)
 }
 addNewEducation(){
  this.userData.Education.push({
    Degree:'',
    Institution:'',
    Location:'',
    Graduation_Date:''
  })
 }

}
