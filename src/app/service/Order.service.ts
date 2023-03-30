import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderDetailDto } from "../model/OrderDetailDto.model";
import { OrderDto } from "../model/OrderDto.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "Application/json",
  }),
};

@Injectable()
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  findByCustomerId(id: number): Observable<OrderDto[]> {
    return this.httpClient
      .get<OrderDto[]>(`http://localhost:8080/api/orders/${id}`)
      .pipe();
  }

  findOrderDetailByOrderId(id: number): Observable<OrderDetailDto[]> {
    return this.httpClient
      .get<OrderDetailDto[]>(
        `http://localhost:8080/api/orderDetails/${id}`,
        httpOptions
      )
      .pipe();
  }

  findAll(): Observable<OrderDto[]> {
    return this.httpClient
      .get<OrderDto[]>("http://localhost:8080/api/orders", httpOptions)
      .pipe();
  }

  updateOrder(order: OrderDto): Observable<OrderDto> {
    return this.httpClient
      .put<OrderDto>("http://localhost:8080/api/orders", order, httpOptions)
      .pipe();
  }
}
