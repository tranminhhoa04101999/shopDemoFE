import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ItemDto } from '../model/ItemDto.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'Application/json',
  }),
};

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(private httpClient: HttpClient) {}

  private searchInput: Subject<string> = new ReplaySubject<string>();
  public alertData = new EventEmitter<{ message: string; alert: string }>();

  findAll(): Observable<ItemDto[]> {
    return this.httpClient.get<ItemDto[]>(
      'http://localhost:8080/api/items',
      httpOptions
    );
  }

  save(item: ItemDto): Observable<ItemDto> {
    return this.httpClient
      .post<ItemDto>('http://localhost:8080/api/items', item, httpOptions)
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
      .put<ItemDto>('http://localhost:8080/api/items', item, httpOptions)
      .pipe();
  }

  getSearchInput(): Observable<string> {
    return this.searchInput.asObservable();
  }

  setSearchInput(chuoi: string) {
    this.searchInput.next(chuoi);
  }
}
