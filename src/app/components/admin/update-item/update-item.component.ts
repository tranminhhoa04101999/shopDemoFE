import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemDto } from "src/app/model/ItemDto.model";
import { ItemService } from "src/app/service/ItemService.service";

@Component({
  selector: "app-update-item",
  templateUrl: "./update-item.component.html",
  styleUrls: ["./update-item.component.css"],
})
export class UpdateItemComponent implements OnInit {
  item: ItemDto = new ItemDto(0, "", 0);
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.itemService.findById(param["id"]).subscribe(
        (data) => {
          this.item = data;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  onSubmit() {
    this.itemService.update(this.item).subscribe(
      (data) => {
        this.router.navigate(["/homeAdmin/item"]);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
