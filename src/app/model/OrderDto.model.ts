import { CustomerDto } from './CustomerDto.model';

export class OrderDto {
  constructor(
    public id: number,
    public status: number,
    public customerDto: CustomerDto,
    public orderDate: Date
  ) {}
}
