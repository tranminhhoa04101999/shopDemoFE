import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { authToken } from "../components/login/login.component";
import { ItemDto } from "../model/ItemDto.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "Application/json",
    Authorization: `Bearer ${authToken}`,
  }),
};

@Injectable({ providedIn: "root" })
export class ItemService {
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ItemDto[]> {
    return this.httpClient.get<ItemDto[]>(
      "http://localhost:8080/api/items",
      httpOptions
    );
  }
}
