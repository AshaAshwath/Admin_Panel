import { Component, OnInit } from '@angular/core';
import{profile} from './profile';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../main/main.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = new profile();
  public response: any;
  constructor(public mainService: MainService,	public router: Router,private snackBar: MdSnackBar,) { }

  ngOnInit() {
  }

    // setpassword() {
    //   if (this.profile.password == this.profile.password1 ) {
    //   let data = {
    //     "userId":localStorage.getItem('userid'),
    //     "password":this.profile.password
    //   }
    //   this.mainService.addProduct('/public/setAdminPassword', data)
    //     .subscribe(
    //       (res: any) => {
    //         this.response = res.body;
    //         console.log("setpassword_____________",this.response);
    //         if (res.status == 200) {
    //           this.snackBar.open('Set password successfull', 'Ok', {
    //             duration: 4000, extraClasses: ['success-snackbar'],
    //           });
    //         }
  
    //       },
    //       (error: any) => {
    //         this.snackBar.open('Try Again', 'Ok', {
    //           duration: 4000, extraClasses: ['success-snackbar'],
    //         });
  
    //       }
    //     );
    //   }
    //   else
    //   {
    //     alert("password not matching");
    //   }
    // }
}