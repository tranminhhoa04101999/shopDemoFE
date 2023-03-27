import { Component, OnInit } from "@angular/core";
import { Customer } from "src/app/model/customer.model";
import { CustomerService } from "src/app/service/customer.service";

export var authToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2ExIiwiaWF0IjoxNjc5OTA4MTQ3LCJleHAiOjE2Nzk5MjYxNDd9.IS_npibeC17NnNwc_pODLOpltkyJiG-LaeLHBVUDv7NaGHRGcZD4wRi1k5eiuIdrAjp9iVGUuZs4AhsMvpMGIg";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  customer: Customer = new Customer(0, "hoa1", "123", 1);
  login = false;
  token: string = "";
  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  onLogin() {
    this.customerService.login(this.customer).subscribe((data) => {
      this.token = data;
      authToken = data;
    });
    // console.log(this.token);
  }
}
