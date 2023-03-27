export class CustomerDto {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public type: number
  ) {}
}
