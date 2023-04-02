import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { ItemService } from "src/app/service/ItemService.service";

declare var $: any;

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent implements OnInit {
  @ViewChild("alertChild", { static: true }) el: ElementRef;

  hide() {
    $(this.el.nativeElement).removeClass("alert-success");
    $(this.el.nativeElement).removeClass("alert-warning");
    $(this.el.nativeElement).hide();
  }

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.alertData.subscribe((data) => {
      $(this.el.nativeElement).find("strong").first().text(data.message);
      $(this.el.nativeElement).addClass(data.alert);
      $(this.el.nativeElement).show();

      setTimeout(() => {
        this.hide();
      }, 3000);
    });
  }
}
