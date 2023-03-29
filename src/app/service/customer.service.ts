import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { CustomerDto } from "../model/CustomerDto.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  token: string = JSON.parse(localStorage.getItem("token"));
  customer: CustomerDto = JSON.parse(localStorage.getItem("inforUsers"));

  private loggedIn: Subject<string> = new ReplaySubject<string>();
  private type: Subject<number> = new ReplaySubject<number>();

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

  save(customer: CustomerDto): Observable<CustomerDto> {
    return this.httpClient
      .post<CustomerDto>("http://localhost:8080/api/customers", customer, {
        headers: new HttpHeaders({
          "Content-Type": "Application/json",
        }),
      })
      .pipe();
  }

  logginStatus(): Observable<string> {
    return this.loggedIn.asObservable();
  }
  getType(): Observable<number> {
    return this.type.asObservable();
  }

  logginLogin() {
    setTimeout(() => {
      let customer = JSON.parse(localStorage.getItem("inforUsers"));
      console.log(customer);
      this.type.next(customer.type);
    }, 100);
    this.loggedIn.next(JSON.parse(localStorage.getItem("token")));
  }
  logginLogout() {
    localStorage.removeItem("inforUsers");
    localStorage.removeItem("token");
    this.loggedIn.next(JSON.parse(localStorage.getItem("token")));
    this.type.next(null);
    this.router.navigate(["login"]);
  }
}
