export class CustomerDto {
  constructor(
    private id: number,
    private username: string,
    private password: string,
    private type: number
  ) {}
}
