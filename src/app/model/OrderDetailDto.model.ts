import { ItemDto } from './ItemDto.model';
import { OrderDto } from './OrderDto.model';

export class OrderDetailDto {
  constructor(
    public id: number,
    public ordersDto: OrderDto,
    public itemDto: ItemDto,
    public quantity: number
  ) {}
}
