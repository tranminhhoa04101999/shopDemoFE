import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { CartDto } from "src/app/model/CartDto.model";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { CartService } from "src/app/service/Cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  carts: CartDto;
  totalPrice: number = 2000;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.carts = data["carts"];
      this.totalPrice = data.carts.cartDetailDtos.reduce((prev, current) => {
        return prev + current.itemDto.price * current.quantity;
      }, 0);
    });
  }
  
  test() {}
  subQuantity(event: { id: number }) {
    const cartNew = this.carts.cartDetailDtos.map((temp) =>
      temp.id === event.id
        ? { ...temp, quantity: temp.quantity > 1 ? temp.quantity - 1 : 1 }
        : temp
    );

    this.carts.cartDetailDtos = cartNew;
  }
  addQuantity(event: { id: number }) {
    const cartNew = this.carts.cartDetailDtos.map((temp) =>
      temp.id === event.id ? { ...temp, quantity: temp.quantity + 1 } : temp
    );

    this.carts.cartDetailDtos = cartNew;
  }
  onDelete(event: { id: number }) {
    this.cartService.deleteCartDetail(event.id).subscribe();
  }

  onUpdateCart() {
    this.carts.cartDetailDtos.map((temp) => {
      temp.cartDto = new CartDto(this.carts.id, this.carts.customerDto, null);

      this.cartService.updateCart(temp).subscribe();
    });
  }
}
