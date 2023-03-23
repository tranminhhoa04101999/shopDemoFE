import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username = "";
  passWord = "";
  login = false;
  constructor() {}

  ngOnInit() {}

  onLogin() {
    this.login = !this.login;
  }
  // onUpdateUsername(event: Event) {
  //   this.userName = (<HTMLInputElement>event.target).value;
  // }
}
