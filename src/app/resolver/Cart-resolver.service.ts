import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CartDto } from "../model/CartDto.model";
import { CustomerDto } from "../model/CustomerDto.model";
import { CartService } from "../service/Cart.service";

@Injectable()
export class CartResolver implements Resolve<CartDto> {
  constructor(private cartService: CartService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CartDto | Observable<CartDto> | Promise<CartDto> {
    let customer: CustomerDto = JSON.parse(localStorage.getItem("inforUsers"));

    return this.cartService.FindByIdCustomer(customer.id);
  }
}
