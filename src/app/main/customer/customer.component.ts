import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { customer } from './customer';
import { MainService } from '../../main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
declare var $;
declare let jsPDF;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerComponent implements OnInit {
  public response: any;
  datatodownlode: any;
  public customerList: any;
  addnewstore = new customer();
  public search: any;
  public fileName: string;

  public eaddnewstore: any = {
    euserName:'',
    euserContactNumber:'',
    euserEmail:'',
    euserstreetAddress:'',
    eusercity:'',
    euserState:'',
    euserzipCode:'',
    euserCountry:'',
  }

  constructor(public mainService: MainService, public router: Router, private snackBar: MdSnackBar, private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.getCustomers();
  }

  Print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('divPrint').innerHTML;
    popupWin = window.open('', '_blank', 'size=2,top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <html>
      <head>
        <title>Print tab</title>
        <style>
        //........Customized style.......
        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
    );
    popupWin.document.close();
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
    var csvData = this.ConvertToCSV(this.datatodownlode);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'CustomerList.csv';
    a.click();
  }

  ///////////////////View customer////////////////
  getCustomers() {
    this.mainService.getData('/public/getAllUsers')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getcustomers_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.UserDetails;
            this.datatodownlode = JSON.stringify(this.customerList);
          }
        },
        (error: any) => {


          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );

  }
/////////////////////////////Add customer//////////////////////
  // addcustomer() {
  //   let data = {
  //     "fullname": this.addnewstore.userName,
  //     "mobileNumber": this.addnewstore.userContactNumber,
  //     "email": this.addnewstore.userEmail,
  //     "address": this.addnewstore.userstreetAddress,
  //     "city": this.addnewstore.usercity,
  //     "state": this.addnewstore.userState,
  //     "pin": this.addnewstore.userzipCode,
  //     "country": this.addnewstore.userCountry,
 
  //   } 
  //   this.mainService.addProduct('/public/userRegister', data)
  //     .subscribe(
  //       (res: any) => {
  //         this.response = res.body;
  //         console.log("addcustomer_____________",this.response);
  //         if (res.status == 200) {
  //           this.snackBar.open('Customer has been added successfully', 'Ok', {
  //             duration: 4000, extraClasses: ['success-snackbar'],
  //           });


  //           this.getCustomers();


  //         }

  //       },
  //       (error: any) => {
  //         this.snackBar.open('Error while adding customer', 'Ok', {
  //           duration: 4000, extraClasses: ['success-snackbar'],
  //         });
  //       }
  //     );
  // }

  //  A-Z
  getCustomerByAscOrder() {
    this.mainService.getData('/public/getCustomersByAscOrder')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getcustomerbyAscending_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.CustomersByAscOrder;

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
  getCustomerByDescOrder() {
    this.mainService.getData('/public/getCustomersByDescOrder')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getcustomerbyDescending_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.CustomersByAscOrder;

          }
        },
        (error: any) => {

          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );

  }
  // **************  SEARCH    ******************

  searchcustomers() {
    let data = {
      "searchName": this.search
    }
    this.mainService.addProduct('/public/searchCustomers', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("searchcustomer_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.CustomersDetails;
          }

        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }

  // *******************Edit**************************

  CustomerToEdit(storeid) {
    let data = {
      "userId": storeid
    }
    localStorage.setItem("edit_user_id",storeid);
    this.mainService.addProduct('/public/editUsers', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("customeredit_____________",this.response);
          if (this.response.result==1) {
            this.eaddnewstore.euserName = this.response.UserInfo.username;
            this.eaddnewstore.euserEmail = this.response.UserInfo.email;
            this.eaddnewstore.euserContactNumber = this.response.UserInfo.mobile;
            this.eaddnewstore.euserstreetAddress = this.response.UserInfo.address;
            this.eaddnewstore.eusercity = this.response.UserInfo.city;
            this.eaddnewstore.euserState = this.response.UserInfo.state;
            this.eaddnewstore.euserCountry = this.response.UserInfo.country;
            this.eaddnewstore.euserzipCode = this.response.UserInfo.pin;
            
          }

        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }
/////////////////////////Update////////////////////
  updatecustomer() {
   
    let data = {
      "userId": localStorage.getItem("edit_user_id"),
      "fullname": this.eaddnewstore.euserName,
      "email": this.eaddnewstore.euserEmail,
      "mobileNumber": this.eaddnewstore.euserContactNumber,
      "address": this.eaddnewstore.euserstreetAddress,
      "city": this.eaddnewstore.eusercity,
      "state":this.eaddnewstore.euserState,
      "country":this.eaddnewstore.euserCountry,
      "pin": this.eaddnewstore.euserzipCode,
   
    }
    this.mainService.addProduct('/public/UpdateUsers',data)
      .subscribe(
        (res: any) => {
          
          this.response = res;
          console.log("customerupdate_____________",this.response);
          if (this.response.body.result == 1) {
            $('#edit').modal('hide');
            this.getCustomers();
            this.snackBar.open('Customer has been updated successfully', 'Ok', {
              duration: 4000, extraClasses: ['success-snackbar'],
            });
          }

        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }
//////////////////////////Delete///////////////////////
customerToDelete(id) {
    localStorage.setItem("userId", id);
  }

  deletecustomer() {
    let data = {
      "userId": localStorage.getItem("userId")
    }
    this.mainService.addProduct('/public/Deleteuser', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("customerdelete_____________",this.response);
          if (res.status == 200) {
            this.getCustomers();

            this.snackBar.open('Customer has been deleted successfully', 'Ok', {
              duration: 4000, extraClasses: ['success-snackbar'],
            });
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
