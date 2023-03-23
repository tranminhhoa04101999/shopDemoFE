import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { CartDetailComponent } from './cart/cart-detail/cart-detail.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HeaderComponent, CartComponent, CartDetailComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
