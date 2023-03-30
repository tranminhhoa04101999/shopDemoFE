import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { CartDto } from "src/app/model/CartDto.model";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { CartService } from "src/app/service/Cart.service";

declare var $: any;

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  @ViewChild("alertChild", { static: true }) el: ElementRef;

  show() {
    $(this.el.nativeElement).show();
    setTimeout(() => {
      $(this.el.nativeElement).hide();
    }, 3000);
  }
  hide() {
    $(this.el.nativeElement).hide();
  }

  carts: CartDto = new CartDto(0, new CustomerDto(0, "", "", 1), []);
  totalPrice: number = 2000;
  emptyDetail = false;
  arr = [];
  errorMessage = "";
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

  subQuantity(event: { id: number }) {
    const cartNew = this.carts.cartDetailDtos.map((temp) =>
      temp.id === event.id
        ? { ...temp, quantity: temp.quantity > 1 ? temp.quantity - 1 : 1 }
        : temp
    );

    this.carts.cartDetailDtos = cartNew;
    // this.ngOnInit();
    cartNew.map((temp) => {
      temp.cartDto = new CartDto(this.carts.id, this.carts.customerDto, null);
      this.cartService.updateCart(temp).subscribe();
    });
  }
  addQuantity(event: { id: number }) {
    const cartNew = this.carts.cartDetailDtos.map((temp) =>
      temp.id === event.id ? { ...temp, quantity: temp.quantity + 1 } : temp
    );

    this.carts.cartDetailDtos = cartNew;
    // this.ngOnInit();
    cartNew.map((temp) => {
      temp.cartDto = new CartDto(this.carts.id, this.carts.customerDto, null);
      this.cartService.updateCart(temp).subscribe();
    });
  }
  onDelete(event: { id: number }) {
    this.cartService.deleteCartDetail(event.id).subscribe((data) => {
      //remove bd thanh cong remove local
      const index = this.carts.cartDetailDtos.findIndex(
        (item) => item.id === event.id
      );
      this.carts.cartDetailDtos.splice(index, 1);
      this.ngOnInit();
    });
  }

  onUpdateCart() {
    this.carts.cartDetailDtos.map((temp) => {
      temp.cartDto = new CartDto(this.carts.id, this.carts.customerDto, null);
      this.cartService.updateCart(temp).subscribe();
    });
    this.ngOnInit();
  }

  placeAnOrder() {
    this.cartService.placeAnOrder(this.carts).subscribe(
      (data) => {},
      (err) => {
        console.log(err.error.message);
      }
    );
    this.show();
  }
}
