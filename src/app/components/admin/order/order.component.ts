import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerDto } from "src/app/model/CustomerDto.model";
import { OrderDto } from "src/app/model/OrderDto.model";
import { OrderService } from "src/app/service/Order.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  orders: OrderDto[] = [
    new OrderDto(
      0,
      0,
      {
        id: 0,
        username: "",
        password: "",
        type: 0,
      },
      new Date()
    ),
  ];
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.findAll().subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdate(event: { id: number }) {
    this.router.navigate(["/homeAdmin/order", event.id]);
  }
  onCheckbx(event: any) {
    if (event.target.checked) {
      this.orderService.findAll().subscribe(
        (data) => {
          let temp = data.filter((item) => {
            return item.status === 0;
          });
          this.orders = temp;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.ngOnInit();
    }
  }
}
