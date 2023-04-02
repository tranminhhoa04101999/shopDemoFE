import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { ItemService } from "src/app/service/ItemService.service";

@Component({
  selector: "app-confirm-model",
  templateUrl: "./confirm-model.component.html",
  styleUrls: ["./confirm-model.component.css"],
})
export class ConfirmModelComponent implements OnInit {
  constructor() {}

  @Input() title = "";
  @Output() onClickFirm = new EventEmitter<string>();
  ngOnInit() {}

  onConfirm() {
    this.onClickFirm.emit("show");
  }
}
