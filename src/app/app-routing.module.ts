import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';
import { ProductsComponent } from './ui/components/products/products.component';

const routes: Routes = [
  {
    path: 'admin', component: LayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'customers', loadChildren: () => import('./admin/components/customers/customers.module').then(m => m.CustomersModule), canActivate: [AuthGuard] },
      { path: 'products', loadChildren: () => import('./admin/components/products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard] },
      { path: 'orders', loadChildren: () => import('./admin/components/orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
      { path: "authorize-menu", loadChildren: () => import("./admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule), canActivate: [AuthGuard] },
      { path: "roles", loadChildren: () => import("./admin/components/role/role.module").then(module => module.RoleModule), canActivate: [AuthGuard] },
      { path: "users", loadChildren: () => import("./admin/components/user/user.module").then(module => module.UserModule), canActivate: [AuthGuard] },
    ], canActivate: [AuthGuard]
  },
  { path: '', component: ProductsComponent, pathMatch: 'full'},
  { path: 'baskets', loadChildren: () => import('./ui/components/baskets/baskets.module').then(m => m.BasketsModule) },
  { path: 'products', loadChildren: () => import('./ui/components/products/products.module').then(m => m.ProductsModule) },
  { path: "products/:pageNo", loadChildren: () => import('./ui/components/products/products.module').then(m => m.ProductsModule) },
  { path: 'register', loadChildren: () => import('./ui/components/register/register.module').then(m => m.RegisterModule) },
  { path: 'login', loadChildren: () => import('./ui/components/login/login.module').then(m => m.LoginModule) },
  { path: "password-reset", loadChildren: () => import("./ui/components/password-reset/password-reset.module").then(module => module.PasswordResetModule) },
  { path: "update-password/:userId/:resetToken", loadChildren: () => import("./ui/components/update-password/update-password.module").then(module => module.UpdatePasswordModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
