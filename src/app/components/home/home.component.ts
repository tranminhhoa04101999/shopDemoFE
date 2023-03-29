import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { ItemDto } from "src/app/model/ItemDto.model";
import { CartService } from "src/app/service/Cart.service";
import { ItemService } from "src/app/service/ItemService.service";

declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  items: ItemDto[] = [{ id: 0, name: "", price: 0 }];
  Customer: CustomerDto = JSON.parse(localStorage.getItem("inforUsers"));
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

  constructor(
    private itemService: ItemService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.itemService.findAll().subscribe((data) => (this.items = data));
  }
  onAddToCart(event: { id: number }) {
    this.cartService
      .addItemToCart({
        itemId: event.id,
        quantity: 1,
        customerId: this.Customer.id,
      })
      .subscribe((data) => {
        this.show();
      });
  }
}
