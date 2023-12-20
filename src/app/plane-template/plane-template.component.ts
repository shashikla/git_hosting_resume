import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2PDF from 'jspdf-html2canvas';
import { UserDataService } from '../user-data.service';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

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
  resumeData: any[] = [];

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   console.log(params);
      
    //   const userName = (params['id']).toLowerCase();
    //   this.name = userName.toUpperCase();
    //   this.userService.getDataByUser(userName).subscribe((user)=>{
    //     console.log({user:user});
    //     this.resumeDetails = user.find((ele:any)=>{
    //       return ele;
    //     });
    //   });
    // });

    this.route.params.subscribe(params => {
      console.log(params);
      
      const userName = (params['name']).toLowerCase();
      this.name = userName.toUpperCase();
      const userID = (params['id']);

      this.userService.getDataByID(userName,userID).subscribe((user)=>{
        console.log({user:user});
        this.resumeDetails = user.find((ele:any)=>{
          return ele;
        });
      });
    });

  }

  generatePDF() {
    // // Source HTMLElement or a string containing HTML.
    const pdf = new jsPDF();
    var elementHTML:any = document.getElementById('invoice');
    
    var opt = {
      margin: 15,
      filename: "Invoice.pdf",
      image: {
        type: "jpeg",
        quality: 1.0,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };
    html2pdf().set(opt).from(elementHTML).save();
    // html2canvas(elementHTML,  { height: elementHTML.scrollHeight }).then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   const imgProps = pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   pdf.save('downloaded.pdf');
    // });


    // const pdfOptions = {
    //   // margin:10,
    //   filname : 'resume.pdf',
    //   image : { type: 'jpeg', quality: 0.98 },
    //   html2canvas : { },
    //   jsPDF : { format: 'a4', orientation: 'portrait'},
    //   mode: 'legacy',
    //   margin: [0.2, 0.1, 0.6, 0.2],
    //   pagebreak: { after: 'section'}
    // };
    // html2pdf().from(elementHTML).set(pdfOptions).save('resume.pdf');

    var data:any = document.getElementById('invoice');
  }

}
