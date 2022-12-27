import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FilterPipePipe } from '../pipes/filter-pipe.pipe';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { StarPipe } from '../pipes/star.pipe';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    FilterPipePipe,
    StarPipe,
    UpdatePasswordComponent,
    CartComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
