import { CartDetailDto } from "./CartDetailDto.model";
import { CustomerDto } from "./CustomerDto.model";

export class CartDto {
  constructor(
    public id: number,
    public customerDto: CustomerDto,
    public cartDetailDtos: CartDetailDto[]
  ) {}
}
