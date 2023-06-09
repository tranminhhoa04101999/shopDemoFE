import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemDto } from 'src/app/model/ItemDto.model';
import { ItemService } from 'src/app/service/ItemService.service';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  item: ItemDto = new ItemDto(0, '', 0);
  constructor(
    private itemService: ItemService,
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.item.price < 1000) {
      this.itemService.alertData.emit({
        message: 'AddItem.errMin',
        alert: 'alert-warning',
      });
      return;
    }
    this.item.name = this.item.name.trim();

    this.itemService.save(this.item).subscribe(
      (data) => {
        this.item = new ItemDto(0, '', 0);
        this.itemService.alertData.emit({
          message: 'Alert.addItem',
          alert: 'alert-success',
        });
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
