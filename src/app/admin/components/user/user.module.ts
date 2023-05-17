import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DialogModule,
    DeleteDirectiveModule,
    RouterModule.forChild([
      { path: "", component: UserComponent }
    ]),
  ]
})
export class UserModule { }
