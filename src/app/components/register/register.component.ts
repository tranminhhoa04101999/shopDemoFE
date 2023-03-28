import { Component, OnInit } from "@angular/core";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { CustomerService } from "src/app/service/customer.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  customer: CustomerDto = { id: 0, username: "", password: "", type: 1 };

  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  onRegister() {
    this.customerService.save(this.customer).subscribe(
      (data) => console.log(data),
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}
