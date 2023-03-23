import { Component, Input, OnInit } from "@angular/core";
import { cart } from "./cart.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  carts: cart[] = [
    new cart("thit", 100, 2, "2023-03-23"),
    new cart("rau", 50, 3, "2023-03-22"),
    new cart("meo", 50, 3, "2023-03-22"),
  ];

  constructor() {}

  ngOnInit() {}
}
