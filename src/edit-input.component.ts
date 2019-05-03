import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.css'],
})
export class EditInputComponent implements OnInit {
  @Input() type = 'text';
  @Input() value: string|number;
  @Output() onValueChanged: EventEmitter<number|string> = new EventEmitter<number|string>();
  editMode = false;
  constructor() {}

  ngOnInit() {}

  onFocusOut() {
    this.onValueChanged.emit(this.value);
  }
}
