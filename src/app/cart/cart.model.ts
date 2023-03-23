export class cart {
  public name: String;
  public price: Number;
  public quantity: Number;
  public dateAdded: String;

  constructor(
    name: String,
    price: Number,
    quantity: Number,
    dateAdded: String
  ) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.dateAdded = dateAdded;
  }
}
