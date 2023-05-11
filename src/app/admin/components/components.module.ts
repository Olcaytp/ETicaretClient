import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { DeleteDirective } from '../../directives/admin/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
