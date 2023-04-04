import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CartDto } from '../model/CartDto.model';
import { CustomerDto } from '../model/CustomerDto.model';
import { CartService } from '../service/Cart.service';

@Injectable()
export class CartResolver implements Resolve<CartDto> {
  constructor(private cartService: CartService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CartDto | Observable<CartDto> | Promise<CartDto> {
    let customer: CustomerDto = JSON.parse(localStorage.getItem('inforUsers'));

    if (customer === null) {
      this.router.navigate(['/login']);
    }
    return this.cartService.FindByIdCustomer(customer.id);
  }
}
