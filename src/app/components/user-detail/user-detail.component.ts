import { Component, OnInit } from "@angular/core";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { CustomerService } from "src/app/service/customer.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  user: CustomerDto = new CustomerDto(0, "", "", 1);

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    const customer: CustomerDto = JSON.parse(
      localStorage.getItem("inforUsers")
    );
    if (customer !== null) {
      this.customerService
        .findById(customer.id)
        .subscribe((data) => (this.user = data));
    }
  }
}
