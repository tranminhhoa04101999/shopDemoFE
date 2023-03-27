import { CartDetailDto } from "./CartDetailDto.model";
import { CustomerDto } from "./CustomerDto.model";

export class CartDto {
  map(arg0: (temp: any) => void) {
    throw new Error("Method not implemented.");
  }
  constructor(
    public id: number,
    public customerDto: CustomerDto,
    public cartDetailDtos: CartDetailDto[]
  ) {}
}
