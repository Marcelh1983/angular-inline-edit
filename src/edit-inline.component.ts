import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-edit-inline',
  templateUrl: './edit-inline.component.html',
  styleUrls: ['./edit-inline.component.css'],
})
export class NgxEditInlineComponent implements OnInit {
  @Input() type = 'text';
  @Input() value: string|number;
  @Input() placeholder: string;
  @Output() onValueChanged: EventEmitter<number|string> = new EventEmitter<number|string>();
  editMode = false;
  constructor() {}

  ngOnInit() {}

  onFocusOut() {
    this.onValueChanged.emit(this.value);
  }
}
