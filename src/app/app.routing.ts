import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { CategoryComponent } from './main/category/category.component';
import { CustomerComponent } from './main/customer/customer.component';
import { ProfileComponent } from './main/profile/profile.component';
import { OrderComponent } from './main/order/order.component';
import { ContactusComponent } from './main/contactus/contactus.component';
import { ProductsComponent } from './main/products/products.component';
import { TotalsalesComponent } from './main/totalsales/totalsales.component';
import { AddnewbannerComponent } from './main/addnewbanner/addnewbanner.component';
import { PincodeComponent } from './main/pincode/pincode.component';
import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
const appRoutes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'category', component: CategoryComponent },
	{ path: 'customer', component: CustomerComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'order', component: OrderComponent },
	{ path: 'contactus', component: ContactusComponent },
	{ path: 'Products', component: ProductsComponent },
	{ path: 'Totalsales', component: TotalsalesComponent },
	{ path: 'OrderLTthirty', component: AddnewbannerComponent },
	{ path: 'Pincode', component: PincodeComponent },
	{ path: 'forgotpassword', component: ForgotPasswordComponent }
];
export const routing = RouterModule.forRoot(appRoutes);