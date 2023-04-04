import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDto } from 'src/app/model/CustomerDto.model';
import { CustomerService } from 'src/app/service/customer.service';

declare var $: any;

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  @ViewChild('submenu', { static: true }) submenu: ElementRef;
  @ViewChild('icondrop', { static: true }) icondrop: ElementRef;

  customer: CustomerDto = JSON.parse(localStorage.getItem('inforUsers'));

  ngOnInit() {
    if (this.customer === null) {
      this.router.navigate(['/login']);
    } else {
      if (this.customer.type === 1) {
        this.router.navigate(['']);
      }
    }
  }

  onSubmit() {}

  toggle() {
    $(this.submenu.nativeElement).slideToggle();
    if ($(this.icondrop.nativeElement).hasClass('active-drop')) {
      $(this.icondrop.nativeElement).removeClass('active-drop');
    } else {
      $(this.icondrop.nativeElement).addClass('active-drop');
    }
  }
}
