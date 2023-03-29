import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { CartComponent } from "./components/cart/cart.component";
import { CustomerService } from "./service/customer.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CartService } from "./service/Cart.service";
import { ItemService } from "./service/ItemService.service";
import { CartResolver } from "./resolver/Cart-resolver.service";
import { JwtInterceptor } from "./service/jwt.interceptor";
import { RegisterComponent } from "./components/register/register.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { OrderService } from "./service/Order.service";
import { HomeAdminComponent } from "./components/admin/home-admin/home-admin.component";
import { ItemComponent } from "./components/admin/item/item.component";
import { AddItemComponent } from "./components/admin/add-item/add-item.component";
import { UpdateItemComponent } from "./components/admin/update-item/update-item.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "userDetail", component: UserDetailComponent },
  { path: "cart", component: CartComponent, resolve: { carts: CartResolver } },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "orders", component: OrdersComponent },
  {
    path: "homeAdmin",
    component: HomeAdminComponent,
    children: [
      { path: "item", component: ItemComponent },
      { path: "addItem", component: AddItemComponent },
      { path: "update/:id", component: UpdateItemComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    UserDetailComponent,
    CartComponent,
    RegisterComponent,
    OrdersComponent,
    HomeAdminComponent,
    ItemComponent,
    AddItemComponent,
    UpdateItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    CustomerService,
    CartService,
    ItemService,
    CartResolver,
    OrderService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
