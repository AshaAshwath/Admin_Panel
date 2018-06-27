import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainService } from './main.service';
import { FormsModule }   from '@angular/forms';
import { TotalsalesComponent } from './totalsales/totalsales.component';
import { AddnewbannerComponent } from './addnewbanner/addnewbanner.component';
import { PincodeComponent } from './pincode/pincode.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainComponent } from './main.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { OrderComponent } from './order/order.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductsComponent } from './products/products.component';
@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [TotalsalesComponent, AddnewbannerComponent, PincodeComponent, 
    ForgotPasswordComponent, MainComponent,SidemenuComponent,CategoryComponent,CustomerComponent,
    LoginComponent,DashboardComponent,ProfileComponent,HeaderComponent,OrderComponent,ContactusComponent,
    ProductsComponent],
  providers: [MainService,] ,
  
})
export class MainModule { }
