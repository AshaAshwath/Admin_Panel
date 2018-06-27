import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { MdSnackBarModule, } from '@angular/material';
import 'hammerjs';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {DataService} from './utils/shared-service/data.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { SidemenuComponent } from './main/sidemenu/sidemenu.component';
import { CategoryComponent } from './main/category/category.component';
import { CustomerComponent } from './main/customer/customer.component';
import { LoginComponent } from './main/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { MainService } from './main/main.service';
import { ProfileComponent } from './main/profile/profile.component';
import { HeaderComponent } from './main/header/header.component';
import { OrderComponent } from './main/order/order.component';
import { ContactusComponent } from './main/contactus/contactus.component';
import { ProductsComponent } from './main/products/products.component';
import { TotalsalesComponent } from './main/totalsales/totalsales.component';
import { AddnewbannerComponent } from './main/addnewbanner/addnewbanner.component';
import { PincodeComponent } from './main/pincode/pincode.component';
import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { MainComponent } from './main/main.component';
@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    CategoryComponent,
    CustomerComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    HeaderComponent,
    OrderComponent,
    ContactusComponent,
    ProductsComponent,
    TotalsalesComponent,
    AddnewbannerComponent,
    PincodeComponent,
    ForgotPasswordComponent,
    MainComponent
 
  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxPaginationModule,
    routing,

    
    MdSnackBarModule, 
    BrowserAnimationsModule,

    MaterialModule,
    FormsModule,

  ],
  providers: [
    DataService,
    MdDialog,
    MainService
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
