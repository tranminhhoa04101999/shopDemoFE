import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartDetailDto } from "../model/CartDetailDto.model";
import { CartDto } from "../model/CartDto.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "Application/json",
  }),
};

@Injectable({ providedIn: "root" })
export class CartService {
  constructor(private httpClient: HttpClient) {}

  FindByIdCustomer(id: number): Observable<CartDto> {
    return this.httpClient
      .get<CartDto>(`http://localhost:8080/api/carts/${id}`, httpOptions)
      .pipe();
  }
  deleteCartDetail(id: number): Observable<any> {
    return this.httpClient.delete(
      `http://localhost:8080/api/carts/${id}`,
      httpOptions
    );
  }

  addItemToCart(model: {
    itemId: number;
    quantity: number;
    customerId: number;
  }): Observable<any> {
    return this.httpClient
      .post("http://localhost:8080/api/carts", model, httpOptions)
      .pipe();
  }

  updateCart(cartDetail: CartDetailDto): Observable<CartDetailDto> {
    return this.httpClient
      .put<CartDetailDto>(
        "http://localhost:8080/api/carts",
        cartDetail,
        httpOptions
      )
      .pipe();
  }
}
