import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';

import { DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import { ListComponent } from '../orders/list/list.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';



@NgModule({
  declarations: [
    OrdersComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: OrdersComponent }
  ]),
  MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    DialogModule,
    FileUploadModule,
    DeleteDirectiveModule
  ]
})
export class OrdersModule { }
