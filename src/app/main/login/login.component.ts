import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import{login} from './login';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any = new login();
  errormessage:any;
  public imageData = new FormData(); // Create a formdata variable to send the uploaded svg file
	public fileUploaded = false; // Maintaining a flag to show the transition and file name according to the file uploaded
	public fileName: string; // Variable to the file name of the uploaded file
	public response: any;
  public filename: string;
  public loader:any = false;
  
  constructor(public mainService: MainService,	public router: Router,private snackBar: MdSnackBar,) {
  
   }
   
  ngOnInit() {
  }

 


doLogin()
{
  this.loader= true;
 
  let data = {
    'username':this.login.username,
    'pass' :this.login.password,
  }
  this.mainService.addProduct('/public/adminLogin',data)
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log('login____________________',this.response);
      if (this.response.result == 1) {
        localStorage.setItem("userid", this.response.LognInDetails.user_id);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.errormessage="Invalid username or password";
        this.loader= false;
      }
    },
    (error: any) => {
      this.loader= false;
      this.snackBar.open('Login failed', 'Ok', {
        duration: 4000,
        extraClasses: ['success-snackbar'],
      });
    }
    );
}

}
