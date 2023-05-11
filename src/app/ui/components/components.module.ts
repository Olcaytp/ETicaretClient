import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
// import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule,
    RegisterModule,
    // LoginModule,
    PasswordResetModule,
    UpdatePasswordModule
  ],
  exports: [
    BasketsModule
  ]
})
export class ComponentsModule { }
