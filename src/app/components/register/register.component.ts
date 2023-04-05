import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerDto } from 'src/app/model/CustomerDto.model';
import { CustomerService } from 'src/app/service/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { ItemService } from 'src/app/service/ItemService.service';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  customer: CustomerDto = { id: 0, username: '', password: '', type: 1 };
  @ViewChild('alertChild', { static: true }) el: ElementRef;

  constructor(
    private customerService: CustomerService,
    public translate: TranslateService,
    private itemService: ItemService
  ) {}

  ngOnInit() {}

  onRegister() {
    this.customerService.save(this.customer).subscribe(
      (data) => {
        this.itemService.alertData.emit({
          message: 'Alert.register',
          alert: 'alert-success',
        });
        this.customer = { id: 0, username: '', password: '', type: 1 };
      },
      (err) => {
        console.log(err);

        this.itemService.alertData.emit({
          message: `${err.error.message}`,
          alert: 'alert-danger',
        });
        console.log(err.error);
      }
    );
  }
}
