import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { CustomerService } from "src/app/service/customer.service";

@Component({
  selector: "app-home-admin",
  templateUrl: "./home-admin.component.html",
  styleUrls: ["./home-admin.component.css"],
})
export class HomeAdminComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}
  customer: CustomerDto = JSON.parse(localStorage.getItem("inforUsers"));

  ngOnInit() {
    if (this.customer === null) {
      this.router.navigate(["/login"]);
    } else {
      if (this.customer.type === 1) {
        this.router.navigate([""]);
      }
    }
  }

  onSubmit() {}
}
