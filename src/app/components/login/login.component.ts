import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDto } from 'src/app/model/CustomerDto.model';
import { CustomerService } from 'src/app/service/customer.service';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  customer: CustomerDto = new CustomerDto(0, '', '', 1);
  @ViewChild('alertChild', { static: true }) el: ElementRef;

  error: { statusCode: number; message: string } = {
    statusCode: 0,
    message: '',
  };

  constructor(
    private customerService: CustomerService,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  show() {
    $(this.el.nativeElement).show();
    setTimeout(() => {
      $(this.el.nativeElement).hide();
    }, 3000);
  }
  hide() {
    $(this.el.nativeElement).hide();
  }

  onLogin() {
    this.customerService.login(this.customer).subscribe(
      (data) => {
        localStorage.setItem('token', JSON.stringify(data));
        setTimeout(() => {
          this.customerService
            .findByUsername(this.customer.username)
            .subscribe((data) => {
              // this.customer = data;
              localStorage.setItem('inforUsers', JSON.stringify(data));
              localStorage.setItem('userType', JSON.stringify(data.type));

              //navigate
              data.type === 0
                ? this.router.navigate(['homeAdmin'])
                : this.router.navigate(['']);
            });
        }, 100);

        setTimeout(() => {
          this.customerService.logginLogin();
        }, 100);
      },
      (err) => {
        let temp = JSON.parse(err.error);
        this.show();

        this.error = {
          statusCode: temp.statusCode,
          message: temp.message,
        };
      }
    );
  }
}
