import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ItemDto } from "src/app/model/ItemDto.model";
import { ItemService } from "src/app/service/ItemService.service";

declare var $: any;

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.css"],
})
export class AddItemComponent implements OnInit {
  item: ItemDto = new ItemDto(0, "", 0);
  @ViewChild("alertChild", { static: true }) el: ElementRef;

  show(message: string, alert: string) {
    $(this.el.nativeElement).find("strong").first().text(message);
    $(this.el.nativeElement).addClass(alert);
    $(this.el.nativeElement).show();
    setTimeout(() => {
      this.hide();
    }, 3000);
  }
  hide() {
    $(this.el.nativeElement).removeClass("alert-success");
    $(this.el.nativeElement).removeClass("alert-warning");
    $(this.el.nativeElement).hide();
  }

  constructor(private itemService: ItemService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.item.name.trim() === "") {
      this.show("Tên không được trống.", "alert-warning");
      return;
    }
    if (this.item.price < 1000) {
      this.show("Giá không được nhỏ hơn 1000", "alert-warning");
      return;
    }
    this.item.name = this.item.name.trim();

    this.itemService.save(this.item).subscribe(
      (data) => {
        this.item = new ItemDto(0, "", 0);
        this.show("Thêm sản phẩm thành công !!", "alert-success");
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
