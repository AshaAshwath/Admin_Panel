import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { pincode } from './pincode';
import { MainService } from '../../main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { log } from 'util';
declare var $;

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})

export class PincodeComponent implements OnInit {
  public response: any;
  PincodeList:any;
  PincodeList1:any;
  PincodeList2:any;
  datatodownlode: any;
  addpincode = new pincode();

  public eaddpincode:any = {
    epincode:'',
    eArea:'',
    eStatus:'',
    epintype:''
  }
    
  constructor(public mainService: MainService, public router: Router, private snackBar: MdSnackBar, private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.getpincode();
    this.getpincode1();
    this.getpincode2();
  }


  getpincode() {
    this.mainService.getData('/public/get5To10Pincodes')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getpincode_____________",this.response);
          if ( this.response.result ==1 ) {
            this.PincodeList = this.response.ProductDetails;
            this.datatodownlode = JSON.stringify(this.PincodeList);
          }
        },
        (error: any) => {


          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );
  }


  getpincode1() {
    this.mainService.getData('/public/get10To20Pincodes')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getpincode1_____________",this.response);
          if ( this.response.result ==1 ) {
            this.PincodeList1 = this.response.ProductDetails;
            this.datatodownlode = JSON.stringify(this.PincodeList1);
          }
        },
        (error: any) => {


          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );
  }


  getpincode2() {
    this.mainService.getData('/public/getFreePincodes')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getpincode2_____________",this.response);
          if ( this.response.result ==1 ) {
            this.PincodeList2 = this.response.ProductDetails;
            this.datatodownlode = JSON.stringify(this.PincodeList2);
          }
        },
        (error: any) => {


          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );
  }

  checkpincode()
  {
    let data=
    {
      "pincode": this.addpincode.pincode,
    }
    this.mainService.addProduct('/public/checkPincode',data)
    .subscribe(
      (res:any) => {
        this.response = res.body;
          console.log("checkpincode_____________",this.response);
          if(this.response.result==1)
          {
            this.snackBar.open('Pincode already exist', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
          }
          else
          {
            this.pincodeadd();
          }
      }
    )
  }
  pincodeadd() {
    let data = {
      "pincode": this.addpincode.pincode,
      "area": this.addpincode.Area,
      "status": this.addpincode.Status,
      "pinType": this.addpincode.pintype,
    }
    this.mainService.addProduct('/public/addPincode',data)
      .subscribe(
        (res: any) => {

          this.response = res.body;
          console.log("addpincode_____________",this.response);
          if ( this.response.result ==1 ) {
            this. getpincode();
            this. getpincode1();
            this. getpincode2();
            this.snackBar.open('Product has been added successfully', 'Ok', {
              duration: 4000, extraClasses: ['success-snackbar'],
            });
          }

        },
        (error: any) => {
          this.snackBar.open('Error while adding customer', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );
  }
  // *********************************************

  PincodeToEdit(storeid) {
    localStorage.setItem('pin-id',storeid);
     let data = {
       "pinId": storeid
     }
     this.mainService.addProduct('/public/editPincode', data)
       .subscribe(
         (res: any) => {
           this.response = res.body;
           console.log("editpincode_____________",this.response);
           if ( this.response.result ==1 ) {
             this.eaddpincode.epincode = this.response.PincodeDetails[0].pincode;
             this.eaddpincode.eArea = this.response.PincodeDetails[0].area;
             this.eaddpincode.eStatus = this.response.PincodeDetails[0].status;
             this.eaddpincode.epintype = this.response.PincodeDetails[0].pin_type;
            
             
           }
 
         },
         (error: any) => {
           this.snackBar.open('Try Again', 'Ok', {
             duration: 4000, extraClasses: ['success-snackbar'],
           });
 
         }
       );
   }
 

   /////////////////Update already added products////////////////
   updateproduct() {
    
     let data = {
       "pinId": localStorage.getItem('pin-id'),
       "pincode": this.eaddpincode.epincode,
       "area": this.eaddpincode.eArea,
       "status": this.eaddpincode.eStatus,
       "type": this.eaddpincode.epintype,
     }
     this.mainService.addProduct('/public/updatePincode', data)
       .subscribe(
         (res: any) => {
           this.response = res.body;
           console.log("updatepincode_____________",this.response);
           if (this.response.result==1) {
            this. getpincode();
            this. getpincode1();
            this. getpincode2();
             $('#edit').modal('hide');
             this.snackBar.open('Product has been updated successfully', 'Ok', {
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
 
 
   ////////////////////Delete the added product///////////////////
   PincodeToDelete(id) {
     localStorage.setItem("pin-id", id);
   }
 
   deleteStore() {
     let data = {
       "pinId": localStorage.getItem("pin-id")
     }
     this.mainService.addProduct('/public/DeletePincode', data)
       .subscribe(
         (res: any) => {
           this.response = res.body;
           console.log("deletepincode_____________",this.response);
           if (res.status == 200) {
            this. getpincode();
            this. getpincode1();
            this. getpincode2();
             this.snackBar.open('Product has been deleted successfully', 'Ok', {
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
  // *********************************************
}


