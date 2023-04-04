import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailDto } from 'src/app/model/OrderDetailDto.model';
import { OrderDto } from 'src/app/model/OrderDto.model';
import { OrderService } from 'src/app/service/Order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  orderDetails: OrderDetailDto[] = [];
  order: OrderDto;
  totalPrice = 0;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.orderService.findOrderDetailByOrderId(params['id']).subscribe(
        (data) => {
          // console.log(data);
          this.orderDetails = data;
          this.order = data[0].ordersDto;

          this.totalPrice = data.reduce((prev, curr) => {
            return prev + curr.quantity * curr.itemDto.price;
          }, 0);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  onChangeStatus() {
    this.order.status = 1;
    this.orderService.updateOrder(this.order).subscribe(
      (data) => {
        this.order = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
