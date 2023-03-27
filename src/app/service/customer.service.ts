import { Customer } from "../model/customer.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerDto } from "../model/CustomerDto.model";
import { authToken } from "../components/login/login.component";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}
  login(customer: Customer): Observable<string> {
    return this.httpClient
      .post("http://localhost:8080/api/login", customer, {
        responseType: "text",
      })
      .pipe();
  }

  findById(id: number): Observable<CustomerDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "Application/json",
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.httpClient
      .get<CustomerDto>(
        `http://localhost:8080/api/customers/${id}`,
        httpOptions
      )
      .pipe();
  }
}
