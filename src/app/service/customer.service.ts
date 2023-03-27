import { Customer } from "../model/customer.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerDto } from "../model/CustomerDto.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}
  token: string = JSON.parse(localStorage.getItem("token"));

  login(customer: CustomerDto): Observable<string> {
    return this.httpClient.post("http://localhost:8080/api/login", customer, {
      responseType: "text",
    });
  }

  findById(id: number): Observable<CustomerDto> {
    return this.httpClient
      .get<CustomerDto>(`http://localhost:8080/api/customers/${id}`, {
        headers: new HttpHeaders({
          "Content-Type": "Application/json",
        }),
      })
      .pipe();
  }

  findByUsername(username: string): Observable<CustomerDto> {
    return this.httpClient
      .get<CustomerDto>(
        `http://localhost:8080/api/customers/username/${username}`,
        {
          headers: new HttpHeaders({
            "Content-Type": "Application/json",
          }),
        }
      )
      .pipe();
  }
}
