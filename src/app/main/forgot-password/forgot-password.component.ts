import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../main/main.service';
import { Forgot } from './forgot';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgot=new Forgot();
  response:any;
  errormessage:any;
  constructor(public mainService: MainService,	public router: Router,private snackBar: MdSnackBar,) { }

  ngOnInit() {
  }

  checkEmail() {
    let data = {
       "username":this.forgot.username,
       "email":this.forgot.email
    }
    this.mainService.addProduct('/public/checkEmail',data)
      .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("checkEmail_____________",this.response);
        if (this.response.result == 1) {
           this.forgotPass();
          localStorage.setItem('userid',this.response.CheckDetails.user_id);
          this.snackBar.open('Check your email', 'Ok', {
            duration: 4000,extraClasses: ['success-snackbar'],
          });
        }
  else
  {
    this.snackBar.open('Invalid email or username', 'Ok', {
      duration: 4000,extraClasses: ['success-snackbar'],
    });
  }
      },
      (error: any) => {
        this.snackBar.open('error', 'Ok', {
          duration: 4000,extraClasses: ['success-snackbar'],
        });
      }
      );
  }




  //get otp to mail
  //forgot password

  forgotPass() {
    let data = {
      'username':this.forgot.username,
      'email':this.forgot.email,
    }
    this.mainService.addProduct('/public/forgotPassword',data)
      .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("forgotpass_____________",this.response);
        if (this.response.result == 1) {
          
          
        }
      },
      (error: any) => {
        this.snackBar.open('Try Again', 'Ok', {
          duration: 4000,extraClasses: ['success-snackbar'],
        });
      }
      );
  }


  //verify the otp in forgot password

  // http://mafi.ind.in/connect/public/checkOtpNumber 




  checkOtpNumber() {
    let data = {
      "username":this.forgot.username,
      'email':this.forgot.email,
      'otpNumber':this.forgot.otp,
      
    }
    this.mainService.addProduct('/public/checkAdminOtpNumber',data)
      .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("checkotpnumber_____________",this.response);
        if (this.response.result == 1) {
          localStorage.setItem('useremail',this.forgot.email)
          this.snackBar.open('otp success', 'Ok', {
            duration: 4000,extraClasses: ['success-snackbar'],
          });
        }
        else
        {
          this.snackBar.open('Invalid Otp', 'Ok', {
          duration: 4000,extraClasses: ['success-snackbar'],
        });
        }
  
      },
      (error: any) => {
        this.snackBar.open('Try again', 'Ok', {
          duration: 4000,extraClasses: ['success-snackbar'],
        });
      }
      );
  }





  //enter the new password and confirm password


  setUserPassword(){
      let data = {
        'userId':localStorage.getItem('userid'),
        'password':this.forgot.newpassword,
     
      }
 

    if(this.forgot.newpassword==this.forgot.conpassword)
    {
      this.mainService.addProduct('/public/setAdminPassword',data)
      .subscribe(
      (res: any) => {
         this.response = res.body;
         console.log("setUserPassword_____________",this.response);
        if (this.response.result == 1) {
  
          
        this.router.navigate(['/login'])
  
          //  alert("your password matches ");
           this.snackBar.open('your password matches', 'Ok', {
            duration: 4000,extraClasses: ['success-snackbar'],
          });
        }
      
        else{
          this.snackBar.open('Invalid  password', 'Ok', {
            duration: 4000,extraClasses: ['success-snackbar'],
          });
        }
      
       
      
      },
      (error: any) => {
        console.log("reset API failed")
      }
      );


    }
    else{
      // alert("No match in password");
      this.snackBar.open('No match in password', 'Ok', {
        duration: 4000,extraClasses: ['success-snackbar'],
      });
    }
  }

}
