import { Component, OnInit } from "@angular/core";
import { ItemDto } from "src/app/model/ItemDto.model";
import { ItemService } from "src/app/service/ItemService.service";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.css"],
})
export class AddItemComponent implements OnInit {
  item: ItemDto = new ItemDto(0, "", 0);

  constructor(private itemService: ItemService) {}

  ngOnInit() {}

  onSubmit() {
    this.itemService.save(this.item).subscribe(
      (data) => {
        console.log(data);
        this.item = new ItemDto(0, "", 0);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
