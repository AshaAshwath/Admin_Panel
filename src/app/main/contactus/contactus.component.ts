import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
declare var $;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})

export class ContactusComponent implements OnInit  {
  public response:any;
  public orderlist:any;
  datatodownlode:any;
  constructor(public mainService: MainService,public router: Router,private snackBar: MdSnackBar) { 
 }

  ngOnInit() {
    this.getAllContacts();
  }

  ///////////////////View Contacts////////////////////
  getAllContacts(){
    this.mainService.getData('/public/getFeedbacks')
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("getAllcontacts_____________",this.response);
      if (res.status == 200) {
        this.orderlist = this.response.FeedbackDetails;
       this.datatodownlode=this.orderlist;
      }
    },
    (error: any) => {
      this.snackBar.open('Error while retrieveing data', 'Ok', {
        duration: 4000,extraClasses: ['success-snackbar'],
      });
    }
    );

  }
}
