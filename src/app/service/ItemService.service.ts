import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItemDto } from "../model/ItemDto.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "Application/json",
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

  save(item: ItemDto): Observable<ItemDto> {
    return this.httpClient
      .post<ItemDto>("http://localhost:8080/api/items", item, httpOptions)
      .pipe();
  }

  delete(idItem: number): Observable<any> {
    return this.httpClient
      .delete<any>(`http://localhost:8080/api/items/${idItem}`, httpOptions)
      .pipe();
  }

  findById(idItem: number): Observable<ItemDto> {
    return this.httpClient
      .get<ItemDto>(`http://localhost:8080/api/items/${idItem}`, httpOptions)
      .pipe();
  }

  update(item: ItemDto): Observable<ItemDto> {
    return this.httpClient
      .put<ItemDto>("http://localhost:8080/api/items", item, httpOptions)
      .pipe();
  }
}
