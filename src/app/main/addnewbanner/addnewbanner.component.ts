import { Component, OnInit } from '@angular/core';
import { order } from '../order/order';
import { MainService } from '../../main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
declare var $;

@Component({
  selector: 'app-addnewbanner',
  templateUrl: './addnewbanner.component.html',
  styleUrls: ['./addnewbanner.component.css']
})

export class AddnewbannerComponent implements OnInit {
  public response:any;
  public orderByIdlist:any;
  public orderlist:any;
  public OrderID:any;
  public OrderDate:any;
  public CustomerName:any;
  public ShippingAddress:any;
  public BillingAddress:any;
  public CustomerCoder:any;
  public ProductName:any;
  public search:any;
  datatodownlode:any;
  status='Delivered';
  statuscan='Cancelled';

  constructor(public mainService: MainService,public router: Router,private snackBar: MdSnackBar,) { }

  ngOnInit() {
    this.functionc();
    this.getOrderLessThanThirty();
  }

  ////////////////////////Changing status to delivered/////////////////////
  Dispachorder(billing)
  {
    let data = {
      "paymentId":billing,
      "status":this.status
    }
    this.mainService.addProduct('/public/updatePaymentStatus', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("Dispachorder____________",this.response);
          if (res.status == 200) {
            this.getOrderLessThanThirty();
          }
        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }

  /////////////////////Changing status to cancelled////////////////////
  cancelled(billing)
  {
    let data = {
      "paymentId":billing,
      "status":this.statuscan
    }
    this.mainService.addProduct('/public/updatePaymentStatus', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("cancelled",this.response);
          if (res.status == 200) {
            this.getOrderLessThanThirty();
          }
        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }

  /////////////////////Export////////////////////////
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

  /////////////////////List appeared through view///////////////////
  getorders(id)
  {
    let data = {
      "paymentId":id,
        }
    this.mainService.addProduct('/public/getOrederProducts',data)
      .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("getorders_________",this.response);
        if (this.response.result == 1) {
           this.orderByIdlist = this.response.OrederProductsDetails;
           this.CustomerCoder=this.response.OrederProductsDetails[0].user_id;
           this.OrderID=this.response.OrederProductsDetails[0].payment_id;
           this.OrderDate=this.response.OrederProductsDetails[0].created_at.split(' ')[0];
           this.CustomerName=this.response.OrederProductsDetails[0].username;
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

  /////////////////////////View Orders less than thirty//////////////////////
  getOrderLessThanThirty(){
    this.mainService.getData('/public/getOrdersLessThanThirty')
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("getorderslessthanthirty______________",this.response);
      if (res.status == 200) {
        this.orderlist = this.response.OrderDetails;
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
  getOrdersLessByAscOrder() {
    this.mainService.getData('/public/getLessThanThirtyByAscOrder')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("ascending__________",this.response);
          if (res.status == 200) {
            this.orderlist = this.response.OrdersByAscOrder;

          }
        },
        (error: any) => {

          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );

  }

  //  Z-A
  getOrdersLessByDescOrder() {
    this.mainService.getData('/public/getLessThanThirtyByDescOrder ')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("Descending___________",this.response);
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
  this.mainService.getData('/public/getLessThanThirtyPendingOrders ')
    .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("getordersbypendingorders_____________",this.response);
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
  this.mainService.getData('/public/getLessThanThirtyVerifiedOrders')
    .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("getordersbyverified_____________",this.response);
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
    ////////////////////search////////////////////
    searchOrder() {
      let data = {
        "searchName": this.search
      }
    // http://127.0.0.1:8000/searchLessThanThirtyOrders

      this.mainService.addProduct('/public/searchLessThanThirtyOrders', data)
        .subscribe(
          (res: any) => {
            this.response = res.body;
            console.log("searchOrder_____________",this.response);
            if (res.status == 200) {
              this.orderlist = this.response.searchLessThanThirtyOrders;
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
