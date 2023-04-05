import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ItemService } from 'src/app/service/ItemService.service';

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.css'],
})
export class ConfirmModelComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  @Input() title = '';
  @Output() onClickFirm = new EventEmitter<string>();
  ngOnInit() {}

  onConfirm() {
    this.onClickFirm.emit('show');
  }
}
