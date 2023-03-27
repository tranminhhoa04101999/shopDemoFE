import { Component, OnInit } from "@angular/core";
import { Customer } from "src/app/model/customer.model";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { CustomerService } from "src/app/service/customer.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  customer: CustomerDto = new CustomerDto(0, "", "", 1);
  login = false;
  error: { statusCode: number; message: string } = {
    statusCode: 0,
    message: "",
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  onLogin() {
    this.customerService.login(this.customer).subscribe(
      (data) => {
        localStorage.setItem("token", JSON.stringify(data));
        this.customerService
          .findByUsername(this.customer.username)
          .subscribe((data) => {
            // this.customer = data;
            localStorage.setItem("inforUsers", JSON.stringify(data));
          });
      },
      (err) => {
        let temp = JSON.parse(err.error);
        this.error = {
          statusCode: temp.statusCode,
          message: temp.message,
        };
        // console.log(temp);
      }
    );
  }

  test() {
    console.log(JSON.parse(localStorage.getItem("inforUsers")));
  }
}
