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
  userData: User[] = [];
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

}
