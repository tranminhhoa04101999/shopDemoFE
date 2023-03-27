import { Component, OnInit } from "@angular/core";
import { ItemDto } from "src/app/model/ItemDto.model";
import { CartService } from "src/app/service/Cart.service";
import { ItemService } from "src/app/service/ItemService.service";
import { authToken } from "../login/login.component";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "VND",
});
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  items: ItemDto[] = [{ id: 0, name: "", price: 0 }];

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
        customerId: 2,
      })
      .subscribe((data) => console.log(data));
  }
}
