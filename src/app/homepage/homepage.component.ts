import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';

interface User {
  Name : string;
  Details : {
    [key: string] : string;
  };
}


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
constructor(private router:Router,
  private userService:UserDataService,
  private snackBar:MatSnackBar)
  {}

  userdata: User[] = [];

  showSnackbarTopPosition(content:any, action:any, duration:any) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  sendData(e:any){
    console.log("name here..", e.name);
    this.userService.getAllData().subscribe((data) => {
      this.userdata = data;
        // const result = this.userdata.find((ele)=>{
        //   console.log(ele)
        //   if((ele.Name).toLowerCase() === (e.name).toLowerCase()){
        //   this.router.navigate(['/details',ele.Name]);
        //   }
        //   else{
        //     this.showSnackbarTopPosition('User Not Found','Done','1000');
        //   }
        //   })
        const result:any = this.userdata.filter((ele)=>{
          return (ele.Name).toLowerCase() === (e.name).toLowerCase()
        })
          console.log({Result:result.length});
          // if(result){
          //   // this.router.navigate(['/details',e.name])
          // }
          // else 
          if(result.length>1){
            this.router.navigate(['/resume-card',e.name])
          }else{
            this.router.navigate(['/details',e.name])
          }
        // const result = this.userdata.filter((ele)=>{
        //   return (ele.Name).toLowerCase() === (e.name).toLowerCase()
        // })
        // if(result.length>1){
        //   this.router.navigate(['/resume-card',e.name])
        // }else{
        //   this.router.navigate(['/details',e.Name]);
        // }
     });
    // this.showName(e.name);
    // 
  }
}
