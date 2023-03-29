import { Component, OnInit } from "@angular/core";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { ItemDto } from "src/app/model/ItemDto.model";
import { CartService } from "src/app/service/Cart.service";
import { ItemService } from "src/app/service/ItemService.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements OnInit {
  items: ItemDto[] = [{ id: 0, name: "", price: 0 }];
  Customer: CustomerDto = JSON.parse(localStorage.getItem("inforUsers"));
  constructor(
    private itemService: ItemService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.itemService.findAll().subscribe((data) => (this.items = data));
  }

  onDeleteItem(event) {
    this.itemService.delete(event.idItem).subscribe(
      (data) => {
        //xoa o local
        let index = this.items.findIndex((item) => item.id === event.idItem);
        this.items.splice(index, 1);
        //
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
