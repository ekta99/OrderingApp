import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {path:'',
    children:[
      {path:'',component:ProductListComponent},
      {path:`product-details/:productName`,component:ProductDetailsComponent},
      {path:'updatepassword',component:UpdatePasswordComponent},
      {path:'viewcart',component:CartComponent},
      {path:'product-details/:productName/viewcart',redirectTo:'viewcart',pathMatch:'full'},
      // {path:'viewcart/productList',redirectTo:'',pathMatch:'full'}
      {path:'myorders',component:OrderDetailsComponent},
      {path:'viewcart/myorders',redirectTo:'myorders',pathMatch:'full'},
      // {path:"**",redirectTo:'',pathMatch:'full'}
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
