import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { CustomerService } from "src/app/service/customer.service";

declare var $: any;

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  customer: CustomerDto = { id: 0, username: "", password: "", type: 1 };
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
  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  onRegister() {
    this.customerService.save(this.customer).subscribe(
      (data) => {
        this.show("Đăng ký thành công !!!", "alert-success");
        this.customer = { id: 0, username: "", password: "", type: 1 };
      },
      (err) => {
        this.show("Đăng ký thất bại !!!", "alert-warning");
      }
    );
  }
}
