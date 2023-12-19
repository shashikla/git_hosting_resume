import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2PDF from 'jspdf-html2canvas';
import { UserDataService } from '../user-data.service';
import html2pdf from 'html2pdf.js';

interface User {
  Name: string;
  Details: {
    [key: string]: string;
  };
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}



@Component({
  selector: 'app-plane-template',
  templateUrl: './plane-template.component.html',
  styleUrls: ['./plane-template.component.scss']
})
export class PlaneTemplateComponent {
  constructor(private route: ActivatedRoute,
    private userService: UserDataService) { }

  userData: User[] = [];
  resumeDetails: any;
  name: string = "";

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   const userName = (params['name']).toLowerCase();
    //   this.name = userName.toUpperCase();
    //   this.userService.getDataByUser(userName).subscribe((user)=>{
    //     console.log({user:user});
    //     this.resumeDetails = user.find((ele:any)=>{
    //       return ele;
    //     });
    //   });
    // });
    this.route.params.subscribe(params => {
      let id = params['id'];
      console.log(id);
      this.userService.getDataByID(id).subscribe((user)=>{
        console.log({user:user});
      })
    })
    
  }

  generatePDF() {
    // // Source HTMLElement or a string containing HTML.
    var elementHTML:any = document.getElementById('invoice');

    const pdfOptions = {
      // margin:10,
      filname : 'resume.pdf',
      image : { type: 'jpeg', quality: 0.98 },
      html2canvas : { },
      jsPDF : { format: 'a4', orientation: 'portrait'},
      mode: 'legacy',
      margin: [0.2, 0.1, 0.6, 0.2],
      pagebreak: { after: 'section'}
    };
    html2pdf().from(elementHTML).set(pdfOptions).save('resume.pdf');

    var data:any = document.getElementById('invoice');
  }

}
