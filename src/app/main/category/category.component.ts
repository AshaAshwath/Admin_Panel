import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MainService } from '../../main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { category } from './category';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

declare var $: any;


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CategoryComponent implements OnInit {
  public formData = new FormData(); 
  addnewcategory=new category();
  public response:any;
  public fileUploaded = false; 
  public categoryList:any;
  public search:any;

  public categorydata:any={
    ecategoryName: '',
    ecategoryCode: '',
    edescription:'',
    estatus:'',
  }

  constructor(public mainService: MainService,public router: Router, private snackBar: MdSnackBar,) { }
 
  ngOnInit() {
  this.getCategory();
  }

///////////////////Add category/////////////////
addcategory()
  {
    let data = {
      "catName":this.addnewcategory.categoryName,
      "catCode":this.addnewcategory.categoryCode,
      "catDescription":this.addnewcategory.description,
      "status":this.addnewcategory.status   
    }
    this.mainService.addCategory('/public/addCatagory ',data)
    .subscribe(
      (res: any) => {
      this.response = res.body;
      console.log("addcategory________",this.response);
      if (res.status == 200) {
      this.snackBar.open('Category has been Added successfully', 'Ok', {
        duration: 4000,       extraClasses: ['success-snackbar'],
      });
      this.getCategory();
      }
    },
    (error: any) => {
      this.snackBar.open('Try again', 'Ok', {
        duration: 4000,       extraClasses: ['success-snackbar'],
      });
    }
    );
  }

////////////////////////View category//////////////////////
  getCategory(){ 

    this.mainService.getData('/public/getAllCatagory')
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("getcategory________",this.response);
      if (res.status == 200) {
        this.categoryList = this.response.ProductDetails;
       
      }
    },
    (error: any) => {
    
      
      this.snackBar.open('Error while retrieving data', 'Ok', {
        duration: 4000,       extraClasses: ['success-snackbar'],
      });}
    );

  }
  
  // A-Z
  getCatagoryByAscOrder(){ 
    this.mainService.getData('/public/getCatagoryByAscOrder')
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("getcateAscending_____________",this.response);
      if (res.status == 200) {
        this.categoryList = this.response.CatagoryByAscOrder;
      }
    },
    (error: any) => {
      this.snackBar.open('Error while retrieving data', 'Ok', {
        duration: 4000,       extraClasses: ['success-snackbar'],
      });
    }
    );

  }
  // Z-A
  getCatagoryByDescOrder(){
    this.mainService.getData('/public/getCatagoryByDescOrder')
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("getcateDescending_____________",this.response);
      if (res.status == 200) {
        this.categoryList = this.response.CatagoryByAscOrder;
      }
    },
    (error: any) => {
    
      
      this.snackBar.open('Error Getting data', 'Ok', {
        duration: 4000,       extraClasses: ['success-snackbar'],
      });
    }
    );

  }

  
  // ******************* SEARCH  *********************
  searchCategory() {
    let data = {
      "searchName": this.search
    }
    this.mainService.addProduct('/public/searchCatagory', data)
      .subscribe(
        (res: any) => {
          this.response = res.body;
          console.log("searchcat_____________",this.response);
          if (res.status == 200) {
            this.categoryList = this.response.CatagoryDetails;
          }

        },
        (error: any) => {
          this.snackBar.open('Try Again', 'Ok', {
            duration: 4000, extraClasses: ['success-snackbar'],
          });

        }
      );
  }
// ******************* SEARCH  *********************


//////////////////////Export/////////////////////////////
  Print() {
    let printContents, popupWin;
    printContents = document.getElementById('divPrint').innerHTML;
    popupWin = window.open('', '_blank', 'size=2,top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write( `
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

 // ******************* UPDATE  *********************
  updateCategory()
  {
    let data = {
      "catId": localStorage.getItem('catId'),
      "catcode":this.categorydata.ecategoryCode,
      "catname": this.categorydata.ecategoryName,
      "catdescription":this.categorydata.edescription,
      "catstatus":this.categorydata.estatus
      }

    this.mainService.addProduct('/public/updateCatagory',data)
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("updatecat_____________",this.response);
      if (res.status == 200) {
        this.getCategory();
        $('#Categoryedit').modal('hide');
      this.snackBar.open('Catagory has been updated successfully', 'Ok', {
        duration: 4000,       extraClasses: ['success-snackbar'],
      });
      }
  
    },
    (error: any) => {
      this.snackBar.open('Try Again', 'Ok', {
        duration: 4000,       extraClasses: ['success-snackbar'],
      });
    
    }
    );
  }
 // ******************* UPDATE  *********************

 // ******************* EDIT  *********************
  categoryToEdit(catid)
  {
    localStorage.setItem('catId',catid);
    let data = {
      "catId":catid
      }
    this.mainService.addProduct('/public/editCatagory',data)
    .subscribe(
    (res: any) => {
      this.response = res.body;
      console.log("Editcat_____________",this.response);
      if (this.response.result==1) {
        this.categorydata.ecatid=this.response.CatagoryDetails.cat_id;
        this.categorydata.ecategoryCode= this.response.CatagoryDetails.cat_code; 
        this.categorydata.ecategoryName= this.response.CatagoryDetails.cat_name; 
        this.categorydata.edescription= this.response.CatagoryDetails.cat_description; 
        this.categorydata. estatus= this.response.CatagoryDetails.cat_status; 
          }
  
    },
    (error: any) => {
      this.snackBar.open('Try Again', 'Ok', {
        duration: 4000,       extraClasses: ['success-snackbar'],
      });
    
    }
    );
  }
  // ******************* EDIT  *********************



// ******************* DELETE  *********************
  categoryToDelete(id)
  {
    localStorage.setItem("catId", id);
  }
  deletecategory()
  {
    let data = {
    "catId":localStorage.getItem("catId"),
    }

  this.mainService.addProduct('/public/deleteCatagory',data)
  .subscribe(
  (res: any) => {
    this.response = res.body;
    console.log("deletecat_____________",this.response);
    if (res.status == 200) {
      this.getCategory();
    this.snackBar.open('Catagory has been deleted successfully', 'Ok', {
      duration: 4000,       extraClasses: ['success-snackbar'],
    });
    }

  },
  (error: any) => {
    this.snackBar.open('Try Again', 'Ok', {
      duration: 4000,       extraClasses: ['success-snackbar'],
    });
  
  }
  );
  }
// ******************* DELETE  *********************

}
