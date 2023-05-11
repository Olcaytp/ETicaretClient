import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogModule } from '@angular/cdk/dialog';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductsComponent }
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
export class ProductsModule { }
