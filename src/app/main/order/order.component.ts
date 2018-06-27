import { Component, OnInit } from '@angular/core';
import { order } from './order';
import { MainService } from '../../main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
declare var $;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  edate:any;
  sdate:any;
  vieworder = new order;
  public response:any;
  public orderByIdlist:any;
  public search:any;
  public orderlist:any;
  datatodownlode:any;
  public OrderID:any;
  public OrderDate:any;
  public CustomerName:any;
  public ShippingAddress:any;
  public BillingAddress:any;
  public CustomerCoder:any;
  public ProductName:any;
  pending=localStorage.getItem('pending');
  verified=localStorage.getItem('verified');
  orderstatus='Verified';
  orderstatuscan='Cancelled';
  constructor(public mainService: MainService,public router: Router,private snackBar: MdSnackBar,) { }

  ngOnInit() {
    this.functionc();

if(this.pending)
{
  
  this.getOrdersBypendingOrder();
}
else if(this.verified)
{
  this.getOrdersByverifiedOrder();
}
else
{
  this.getAllOrders();
  
}

}
  Dispachorder(billing)
  {
    let data = {
      "paymentId":billing,
      "status":this.orderstatus
    }
    this.mainService.addProduct('/public/updatePaymentStatus', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("Dispachorder",this.response);
          if (res.status == 200) {
            this.getAllOrders();
          }
        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }
  cancelled(billing)
  {
    let data = {
      "paymentId":billing,
      "status":this.orderstatuscan
    }
    this.mainService.addProduct('/public/updatePaymentStatus', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("cancelled_____________",this.response);
          if (res.status == 200) {
            this.getAllOrders();
          }
        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }
  /////////////////////Export////////////////////
  functionc(){
    $('.dropdown-submenu a.test').on("click", function(e){
      $(this).next('ul').toggle();
      e.stopPropagation();
      e.preventDefault();
    });
  }
  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
  Download() {
    this.datatodownlode=JSON.stringify(this.datatodownlode)
    var csvData = this.ConvertToCSV(this.datatodownlode);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'OrderList.csv';
    a.click();
  }

  getorders(id,date)
  {
    let data = {
      "paymentId":id,
      "paymentDate":date
        }
    this.mainService.addProduct('/public/getOrederProducts',data)
      .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("getOrders_____________",this.response);
        if (res.status == 200) {
           this.orderByIdlist = this.response.OrederProductsDetails;
           this.CustomerCoder=this.response.OrederProductsDetails[0].user_id;
           this.OrderID=this.response.OrederProductsDetails[0].payment_id;
           this.OrderDate=this.response.OrederProductsDetails[0].created_at;
           this.CustomerName=this.response.OrederProductsDetails[0].username;
           console.log(this.CustomerName);
           this.ProductName=this.response.OrederProductsDetails[0].product_name;
           this.ShippingAddress=this.response.OrederProductsDetails[0].address+" "+this.response.OrederProductsDetails[0].city+" "+this.response.OrederProductsDetails[0].state+" "+this.response.OrederProductsDetails[0].country+" "+this.response.OrederProductsDetails[0].pin+" "+this.response.OrederProductsDetails[0].mobile;
          this.BillingAddress=this.response.OrederProductsDetails[0].address+" "+this.response.OrederProductsDetails[0].city+" "+this.response.OrederProductsDetails[0].state+" "+this.response.OrederProductsDetails[0].country+" "+this.response.OrederProductsDetails[0].pin+" "+this.response.OrederProductsDetails[0].mobile;
        if(this.orderByIdlist.length==0)
        {
          this.CustomerCoder=' ';
          this.OrderID=' ';
          this.OrderDate=' ';
          this.CustomerName=' ';
     
        }
          }

      },
      (error: any) => {
        this.snackBar.open('Error while adding a product', 'Ok', {
          duration: 4000,extraClasses: ['success-snackbar'],
        });
      }
      );
  }
  getAllOrders(){
    this.mainService.getData('/public/getAllPaymentDetails')
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("getAllOrders_____________",this.response);
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
  //  A-Z
  getOrdersByAscOrder() {
    this.mainService.getData('/public/getOrdersByAscOrder')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("ordersbyAscendingorder_____________",this.response);
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
          console.log("getordersbyDescending_____________",this.response);
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
          console.log("getordersbypendingorders_____________",this.response);
          if (res.status == 200) {
            this.orderlist = this.response.PendingOrders;
            localStorage.setItem('pending','');
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
          console.log("getordersbyverified_____________",this.response);
          if (res.status == 200) {
            this.orderlist = this.response.VerifiedOrders;
        localStorage.setItem('verified','');
          }
        },
        (error: any) => {

          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );

  }
  ////////////////////search////////////////////
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
///////////////////sort by date///////////////////
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
        console.log("getordersbydate_____________",this.response);
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
}