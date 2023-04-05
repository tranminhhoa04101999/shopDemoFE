import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailDto } from 'src/app/model/OrderDetailDto.model';
import { OrderDto } from 'src/app/model/OrderDto.model';
import { OrderService } from 'src/app/service/Order.service';
import { TranslateService } from '@ngx-translate/core';
import { ItemService } from 'src/app/service/ItemService.service';

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
    private route: ActivatedRoute,
    private itemService: ItemService,
    public translate: TranslateService
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
        this.itemService.alertData.emit({
          message: 'Alert.changeStatus',
          alert: 'alert-success',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
