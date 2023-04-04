import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { CustomerDto } from 'src/app/model/CustomerDto.model';
import { CustomerService } from 'src/app/service/customer.service';
import { ItemService } from 'src/app/service/ItemService.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  customer: CustomerDto = JSON.parse(localStorage.getItem('inforUsers'));
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private itemService: ItemService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'vi']);
  }
  logginIn = JSON.parse(localStorage.getItem('token'));
  userType = JSON.parse(localStorage.getItem('userType'));
  private searchInput = '';

  ngOnInit() {
    this.customerService.logginStatus().subscribe((loggedIn) => {
      this.logginIn = loggedIn;
    });
    this.customerService.getType().subscribe((data) => {
      this.userType = data;
    });
  }

  onLogout() {
    this.customerService.logginLogout();
  }

  onTest() {}

  onSearch() {
    this.itemService.setSearchInput(this.searchInput);
    this.router.navigate(['/']);
  }
}
