import { CartDto } from './CartDto.model';
import { ItemDto } from './ItemDto.model';

export class CartDetailDto {
  public constructor(
    public id: number,
    public itemDto: ItemDto,
    public cartDto: CartDto,
    public quantity: number,
    public dateAdded: Date
  ) {}
}
