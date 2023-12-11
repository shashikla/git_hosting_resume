import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2PDF from 'jspdf-html2canvas';
import { UserDataService } from '../user-data.service';
import html2pdf from 'html2pdf.js';

// import html2pdf from 'html2pdf.js';

// html2PDF(node, options);

interface User {
  Name : string;
  Details : {
    [key: string] : string;
  };
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  ];

userData : User[] = [];
resumeDetails : any;
name:string="";

@ViewChild('invoice') invoiceElement!: ElementRef;

  constructor(
              private route:ActivatedRoute,
              private userService:UserDataService) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userName = (params['name']).toLowerCase();
      this.name = userName.toUpperCase();
      this.userService.getDataByUser(userName).subscribe((user)=>{
        this.resumeDetails = user.find((ele:any)=>{
          return ele;
        });
      });
    });

    
  }


  generatePDF() {
    // // Source HTMLElement or a string containing HTML.
    var elementHTML:any = document.getElementById('invoice');

    const pdfOptions = {
      // margin:10,
      filname : 'resume.pdf',
      image : { type: 'jpeg', quality: 0.98 },
      html2canvas : { },
      // format: 'a4', 
      jsPDF : { orientation: 'portrait', },
      mode: 'legacy',
      margin: [0.2, 0.6, 0.6, 0.2],
      pagebreak: { after: 'section'}
    };
    html2pdf().from(elementHTML).set(pdfOptions).save('resume.pdf');

    var data:any = document.getElementById('invoice');
    

    // html2PDF(elementHTML, {
    //   jsPDF: {
    //     format: 'a4',
    //   },
    //   imageType: 'image/jpeg',
    //   output: './pdf/generate.pdf'
    // });
  
    
    // code 2: 

    // html2canvas(data).then(canvas => {

    //   var imgWidth = 208;
    //   var pageHeight = 295;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   var heightLeft = imgHeight;

    //   const contentDataURL = canvas.toDataURL('image/png')
    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth,imgHeight)
    //   pdf.save('new-file.pdf'); // Generated PDF
    // })


    // html2canvas(data).then(canvas => {

    //   const contentDataURL = canvas.toDataURL('image/png')
    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //   var width = pdf.internal.pageSize.getWidth();
    //   var height = canvas.height * width / canvas.width;
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, width,height)
    //   pdf.save('new-file.pdf'); // Generated PDF
    // })

    // code 3:

    // html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
    //   const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
    //   const fileWidth = 200;
    //   const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
    //   let PDF = new jsPDF('p', 'mm', 'a4',);
    //   PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
    //   PDF.html(this.invoiceElement.nativeElement.innerHTML)
    //   PDF.save('angular-invoice-pdf-demo.pdf');
    // });

  }

}
