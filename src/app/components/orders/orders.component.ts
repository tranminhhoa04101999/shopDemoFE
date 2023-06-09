import { Component, OnInit } from '@angular/core';
import { CustomerDto } from 'src/app/model/CustomerDto.model';
import { OrderDetailDto } from 'src/app/model/OrderDetailDto.model';
import { OrderDto } from 'src/app/model/OrderDto.model';
import { OrderService } from 'src/app/service/Order.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    public translate: TranslateService
  ) {}

  orders: OrderDto[] = [];
  orderDetail: OrderDetailDto[] = [];
  totalOrderDetail: number = 0;
  customer: CustomerDto = JSON.parse(localStorage.getItem('inforUsers'));

  ngOnInit() {
    this.orderService.findByCustomerId(this.customer.id).subscribe((data) => {
      this.orders = data;
      console.log(data);
    });
  }

  showDetails(event: { idOrder: number }) {
    this.orderService
      .findOrderDetailByOrderId(event.idOrder)
      .subscribe((data) => {
        this.orderDetail = data;

        this.totalOrderDetail = data.reduce((prev, cur) => {
          return prev + cur.quantity * cur.itemDto.price;
        }, 0);
      });
  }
}
