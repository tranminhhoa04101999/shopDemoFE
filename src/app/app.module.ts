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

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "userDetail", component: UserDetailComponent },
  { path: "cart", component: CartComponent, resolve: { carts: CartResolver } },
  { path: "login", component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    UserDetailComponent,
    CartComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
