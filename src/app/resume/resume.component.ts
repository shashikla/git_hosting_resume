import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2PDF from 'jspdf-html2canvas';
import { UserDataService } from '../user-data.service';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';

// import html2pdf from 'html2pdf.js';

// html2PDF(node, options);

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
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  tiles: Tile[] = [
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
  ];

  userData: User[] = [];
  resumeDetails: any;
  name: string = "";

  @ViewChild('invoice') invoiceElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private userService: UserDataService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userName = (params['name']).toLowerCase();
      this.name = userName.toUpperCase();
      this.userService.getDataByUser(userName).subscribe((user) => {
        this.resumeDetails = user;
        // this.resumeDetails = user.map((ele:any)=>{
        //   return ele;
        // });
        // console.log(this.resumeDetails);
      });
    });


  }

  viewTemplate(data) {
    console.log(data.Name, data._id);
    this.router.navigate(['/details',data.Name, data._id])
    // this.router.navigate(['/details'],{
    //   state: {resumeData : data}
    // })
    // this.userService.getDataByID(data._id).subscribe((user) => {
    //   console.log(user);
    // })
  }

}
