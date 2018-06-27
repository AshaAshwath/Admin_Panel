import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { product } from './products';
import { MainService } from '../../main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { log } from 'util';
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
declare var $;
declare let jsPDF;

@Component({
  selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProductsComponent implements OnInit {
  public formData = new FormData();
  public imageData = new FormData();
  public response: any;
  catagoryList:any;
  datatodownlode: any;
  public customerList: any;
  addnewstore = new product();
  public search: any;
  count=0;
  public fileUploaded = false;
  public fileName: string;
  public preimg=[];
  public preimg1:any;
  public eaddnewstore: any = {
    eproductName: '',
    eproductCode: '',
    eprice:'',
    ediscount:'',
    egst:'',
    eshortdescription:'',
    eproductdescription:'',
    eproductimage:'',
    eUOM:'',
    estatus:'',
    epreservationmeaures:'',
  }


  constructor(public mainService: MainService, public router: Router, private snackBar: MdSnackBar, private _cfr: ComponentFactoryResolver){}


  ngOnInit() {
    this.getproduct();
    this.getcategory();
  }
  
  ////////////Upload single file//////////
  uploadFile(event,type) {
    let file = event.target.files[0];
    if (event.target.files && file) {
    this.imageData.append('file', file);
    this.fileName = file.name;
    this.fileUploaded = true;
    this.uploadFileServer();
  }
}

uploadFileServer() {
    this.mainService.uploadFile('/public/imageUpload', this.imageData).subscribe(res => {
    this.response = res;
    if (this.response.body.result) {
      this.preimg1=this.response.body.UploadImages;
    }
    else {
      this.snackBar.open('Error while uploading a file', 'Ok', {
        duration: 4000,
        extraClasses: ['success-snackbar'],
      });
    }
  }
  );
}

////////////Upload 3 files////////
  uploadFiles(event,type) {
    let file = event.target.files[0];
   if (event.target.files && file) {
      this.imageData.append('file', file);
      this.fileName = file.name;
      this.fileUploaded = true;
      this.uploadFileServer1();
    }
  }
  uploadFileServer1() {
    if(this.count!=3)
    {
    this.mainService.uploadFile('/public/imageUpload', this.imageData).subscribe(res => {
      this.response = res;
      if (this.response.body.result) {
       
        this.preimg.push(this.response.body.UploadImages);
        this.count=this.count +1;
      }
      else {
        this.snackBar.open('Error while uploading a file', 'Ok', {
          duration: 4000,
          extraClasses: ['success-snackbar'],
        });
      }
    }
    );
  }
  else{
    this.snackBar.open('reached max limit', 'Ok', {
      duration: 4000,
      extraClasses: ['success-snackbar'],
    });
  }
  }

  ////////Export functionality/////////
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

  ///////////////Displaying the details in view tab////////////
  getproduct() {
    this.mainService.getData('/public/getAllProducts')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getproduct_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.ProductDetails;
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

  ////////////////////Add products//////////////
  addproduct() {

    let data = {
      "productName": this.addnewstore.productName,
      "productCode": this.addnewstore.productCode,
      "productPrice": JSON.parse(this.addnewstore.price),
      "productDiscount": JSON.parse(this.addnewstore.discount),
      "shortDescription": this.addnewstore.shortdescription,
      "productDescription": this.addnewstore.productdescription,
      "preserveDescription": this.addnewstore.preservationmeaures,
      "productImg": this.preimg1,
      "galleryImg1":this.preimg[0],
      "galleryImg2":this.preimg[1],
      "galleryImg3":this.preimg[2],
      "uom": this.addnewstore.UOM,
      "status": this.addnewstore.status,
      "catId":localStorage.getItem('cat_id')
    }
    this.mainService.addProduct('/public/addProducts',data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("addproduct_____________",this.response);
          if (res.status == 200) {
            this.count=0;
            this.snackBar.open('Product has been added successfully', 'Ok', {
              duration: 4000, extraClasses: ['success-snackbar'],
            });
            this.getproduct();
          }
        },
        (error: any) => {
          this.snackBar.open('Error while adding Product', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );
  }

  //  A-Z
  getProductsByAscOrder() {
    this.mainService.getData('/public/getProductsByAscOrder')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getproductsbyascendingorder_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.ProductsByAscOrder;

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
  getProductsByDescOrder() {
    this.mainService.getData('/public/getProductsByDescOrder')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getproductsbydescending_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.ProductsByAscOrder;

          }
        },
        (error: any) => {

          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );

  }
  ////////////////////////////
  getProductsByRecentlyadded()
  {
    this.mainService.getData('/public/getRecentlyAddedProducts')
    .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("getproductsbydescending_____________",this.response);
        if (res.status == 200) {
          this.customerList = this.response.RecentlyAddedProducts;

        }
      },
      (error: any) => {

        this.snackBar.open('Error while retrieving data', 'Ok', {
          duration: 4000, extraClasses: ['success-snackbar'],
        });
      }
    );
  }
  ////////////////////////////
  getrawcategorybyasscendingorder()
  {
    this.mainService.getData('/public/getRawCatagoryByAscOrder')
    .subscribe(
      (res: any) => {
        this.response = res.body;
        console.log("getRawCatagoryByAscOrder___________________",this.response);
        if (res.status == 200) {
          this.customerList = this.response.RawCatagoryByAscOrder;

        }
      },
      (error: any) => {

        this.snackBar.open('Error while retrieving data', 'Ok', {
          duration: 4000, extraClasses: ['success-snackbar'],
        });
      }
    );
  }
  
   //////////////////////////////////
   getfrozencategorybyasscendingorder()
   {
     this.mainService.getData('/public/getFROZENCatagoryByAscOrder')
     .subscribe(
       (res: any) => {
         this.response = res.body;
         console.log("getRawCatagoryByAscOrder___________________",this.response);
         if (res.status == 200) {
           this.customerList = this.response.FROZENCatagoryByAscOrder;
         }
       },
       (error: any) => {
 
         this.snackBar.open('Error while retrieving data', 'Ok', {
           duration: 4000, extraClasses: ['success-snackbar'],
         });
       }
     );
   }
/////////////ENABLE///////////
getProductsByEnableOrder() {
    this.mainService.getData('/public/getEnableProducts')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getproductsbyenableorder_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.EnableProducts;

          }
        },
        (error: any) => {

          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );

  }
//////////////DISABLE///////////
getProductsByDisableOrder() {
    this.mainService.getData('/public/getDisableProducts')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getproductsbydescendingorder_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.DisableProducts;

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
  searchProducts() {
    let data = {
      "searchName": this.search
    }
    this.mainService.addProduct('/public/searchProducts', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("searchProducts_____________",this.response);
          if (res.status == 200) {
            this.customerList = this.response.ProductDetails;
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

  ProductToEdit(storeid) {
   localStorage.setItem('product-id',storeid);
    let data = {
      "productId": storeid
    }

    this.mainService.addProduct('/public/editProducts', data)
      .subscribe(
        (res: any) => {
          
          this.response = res.body;
          console.log("editproducts_____________",this.response);
          if (res.status == 200) {

         
            this.eaddnewstore.eproductName = this.response.ProductInfo.product_name;
            this.eaddnewstore.eproductCode = this.response.ProductInfo.product_code;
            this.eaddnewstore.eprice = this.response.ProductInfo.product_price;
            this.eaddnewstore.ediscount = this.response.ProductInfo.discount_price;
            this.eaddnewstore.eshortdescription = this.response.ProductInfo.short_description;
            this.eaddnewstore.eproductdescription = this.response.ProductInfo.product_description;
            this.eaddnewstore.eproductimage = this.response.ProductInfo.product_image;
            console.log(this.eaddnewstore.eproductimage);
             this.eaddnewstore.epreservationmeaures = this.response.ProductInfo.preserveDescription;

               // Billing              
            this.eaddnewstore.eUOM = this.response.ProductInfo.uom;
            this.eaddnewstore.estatus = this.response.ProductInfo.product_status;
            
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
      "productId": localStorage.getItem('product-id'),
      "productName": this.eaddnewstore.eproductName,
      "productCode": this.eaddnewstore.eproductCode,
      "productPrice": this.eaddnewstore.eprice,
      "productDiscount": this.eaddnewstore.ediscount,
      "shortDescription": this.eaddnewstore.eshortdescription,
      "productDescription": this.eaddnewstore.eproductdescription,
      "preserveDescription": this.eaddnewstore.epreservationmeaures,
      "image":  this.eaddnewstore.eproductimage,
      "uom": this.eaddnewstore.eUOM,
      "status": this.eaddnewstore.estatus,
      
    }
    this.mainService.addProduct('/public/updateProducts', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("updateproducts_____________",this.response);
          if (res.status == 200) {
            $('#edit').modal('hide');
            this.getproduct();
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
  productToDelete(id) {
    localStorage.setItem("productId", id);
  }

  deleteStore() {
    let data = {
      "productId": localStorage.getItem("productId")
    }
    this.mainService.addProduct('/public/DeleteProduct', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("deleteproducts_____________",this.response);
          if (res.status == 200) {
            this.getproduct();

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

  getcategory() {
    this.mainService.getData('/public/getAllCatagory')
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("getcategory_____________",this.response);
          if (this.response.result == 1) {
          
            this.catagoryList = this.response.ProductDetails;
         
          }
        },
        (error: any) => {


          this.snackBar.open('Error while retrieving data', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });
        }
      );

  }
  getCatId(catname)
  {
for(let i=0;i<this.catagoryList.length;i++)
{
  if(catname==this.catagoryList[i].cat_name)
  {
    localStorage.setItem('cat_id',this.catagoryList[i].cat_id);
  }
}
  }
}


