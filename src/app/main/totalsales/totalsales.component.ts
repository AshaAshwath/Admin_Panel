import { Component, OnInit } from '@angular/core';
import { order } from '../order/order';
import { MainService } from '../../main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
declare var $;

@Component({
  selector: 'app-totalsales',
    templateUrl: './totalsales.component.html',
    styleUrls: ['./totalsales.component.css']
})
export class TotalsalesComponent implements OnInit {
  edate:any;
  sdate:any;
  vieworder = new order;
  public response:any;
  public orderlist:any;
  public search:any;
  datatodownlode:any;
  public editaddnewItem: any = {
    edititemcode: '',
    edititemname: '',
    edititemquanty: '',
    editvom: '',
    editamount: '',
  }
  constructor(public mainService: MainService,public router: Router,private snackBar: MdSnackBar,) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders(){
    this.mainService.getData('/public/getAllPaymentDetails')
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("getorders_____________",this.response);
      if (res.status == 200) {
        this.orderlist = this.response.PaymentDetails;
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
  getordersbydate()
  {
    
    let data = {
       "startDate":this.vieworder.sdate,
      "endDate":this.vieworder.edate
             }
    this.mainService.addProduct('/public/getOdersByDate',data)
      .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("getordersbydate_____________",res);
        if (res.status == 200) {
           this.orderlist = this.response.data;
           console.log(this.orderlist);
           this.datatodownlode=this.orderlist;
          }
      },
      (error: any) => {
        this.snackBar.open('Error while getting orders list', 'Ok', {
          duration: 4000,extraClasses: ['success-snackbar'],
        });
      }
      );
  }
    //  A-Z
    getOrdersByAscOrder() {
      this.mainService.getData('/public/getOrdersByAscOrder')
        .subscribe(
          (res: any) => {
            this.response = res.body;
            console.log("getordersbyascendingorder_____________",this.response);
            if (res.status == 200) {
              this.orderlist = this.response.OrdersByAscOrder;
  
            }
          },
          (error: any) => {
  
            this.snackBar.open('Error whiel retrieving data', 'Ok', {
              duration: 4000, extraClasses: ['success-snackbar'],
            });
          }
        );
  
    }
  
    //  Z-A
    getOrdersByDescOrder() {
      this.mainService.getData('/public/getOrdersByDescOrder')
        .subscribe(
          (res: any) => {
            this.response = res.body;
            console.log("getordersbydescendingorder_____________",this.response);
            if (res.status == 200) {
              this.orderlist = this.response.OrdersByDescOrder;
  
            }
          },
          (error: any) => {
  
            this.snackBar.open('Error while retrieving data', 'Ok', {
              duration: 4000, extraClasses: ['success-snackbar'],
            });
          }
        );
  
    }
  /////////////////Filter by Pending order//////////////
  getOrdersBypendingOrder() {
      this.mainService.getData('/public/getPendingOrders')
        .subscribe(
          (res: any) => {
            this.response = res.body;
            console.log("getordersbypendingorder_____________",this.response);
            if (res.status == 200) {
              this.orderlist = this.response.PendingOrders;
              
            }
          },
          (error: any) => {
  
            this.snackBar.open('Error while retrieving data', 'Ok', {
              duration: 4000, extraClasses: ['success-snackbar'],
            });
          }
        );
  
    }
  /////////////////Filter by verified order//////////////
  getOrdersByverifiedOrder() {
      this.mainService.getData('/public/getVerifiedOrders')
        .subscribe(
          (res: any) => {
            this.response = res.body;
            console.log("getordersbyverifiedorder_____________",this.response);
            if (res.status == 200) {
              this.orderlist = this.response.VerifiedOrders;
            }
          },
          (error: any) => {
  
            this.snackBar.open('Error while retrieving data', 'Ok', {
              duration: 4000, extraClasses: ['success-snackbar'],
            });
          }
        );
  
    }
    /////////////////////SEARCH//////////////////
    searchOrder() {
    let data = {
      "searchName": this.search
    }
    this.mainService.addProduct('/public/searchOrders', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("searchOrder_____________",this.response);
          if (res.status == 200) {
            this.orderlist = this.response.CatagoryDetails;
          }

        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }
}
