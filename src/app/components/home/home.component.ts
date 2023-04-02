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

  constructor(
    private itemService: ItemService,
    private cartService: CartService
  ) {}

  private searchInput = "";

  ngOnInit() {
    this.itemService.findAll().subscribe((data) => (this.items = data));

    this.itemService.getSearchInput().subscribe((data) => {
      this.searchInput = data;

      this.itemService.findAll().subscribe((data2) => {
        if (data === "") {
          this.items = data2;
        } else {
          this.items = data2.filter((item) =>
            item.name.toLowerCase().includes(data.toLowerCase())
          );
        }
      });
    });
  }

  onAddToCart(event: { id: number }) {
    this.cartService
      .addItemToCart({
        itemId: event.id,
        quantity: 1,
        customerId: this.Customer.id,
      })
      .subscribe((data) => {
        this.itemService.alertData.emit({
          message: "Đã thêm vào giỏ !!",
          alert: "alert-success",
        });
      });
  }
}
