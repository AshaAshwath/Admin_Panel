import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../main/main.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  response:any;
  Counts:any;
  customer:any;
  orders:any;
  count=1;
  constructor(public mainService: MainService,public router: Router, private snackBar: MdSnackBar,) { }

      ngOnInit() {
        this.getSales();
        this.getcustomer();
        this.getOrders ();
      }

     ///////////Total number of sales/////////
      getSales()
      {  
         this.mainService.getData('/public/CountSales')
           .subscribe(
           (res: any) => {
             this.response = res.body;
             console.log("getNumberofsales_____________",this.response);
             if (this.response.result==1) {
               this.Counts=this.response.TotalSales[0].Counts;
             }
           },
           (error: any) => {
             this.snackBar.open('Error Getting data', 'Ok', {
               duration: 4000,
             });
             }
           );  
        } 

        ///pending
        setPending(){
          localStorage.setItem('pending','pending');
          localStorage.setItem('verified','');
          this.router.navigateByUrl('/order');
        }
////////completed
setcompleted()
{
  localStorage.setItem('verified','verified');
  localStorage.setItem('pending','');
  this.router.navigateByUrl('/order');
}
        
    ///////////Total number of customers///////////
        getcustomer()
        {  
            this.mainService.getData('/public/CountUsers')
              .subscribe(
              (res: any) => {
                this.response = res.body;
                console.log("getNumberofcustomers_____________",this.response);
                if (this.response.result==1) {
                  this.customer=this.response.TotalUsers[0].Counts;
                }
              },
              (error: any) => {
                this.snackBar.open('Error Getting data', 'Ok', {
                  duration: 4000,
                });
                }
              );
           } 

    ///////////Total number of orders///////////
           getOrders()
           {  
               this.mainService.getData('/public/CountOrders')
                 .subscribe(
                 (res: any) => {
                   this.response = res.body;
                   console.log("getnumberofpendingorders_____________",this.response);
                   if (this.response.result==1) {
                     this.orders=this.response.TotalOrders[0].Counts;
                   }
                 },
                 (error: any) => {
                   this.snackBar.open('Error Getting data', 'Ok', {
                     duration: 4000,
                   });
                   }
                 );
          } 
}