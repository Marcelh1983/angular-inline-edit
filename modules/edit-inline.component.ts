import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'ngx-edit-inline',
  templateUrl: './edit-inline.component.html',
  styleUrls: ['./edit-inline.component.css'],
})
export class NgxEditInlineComponent implements OnInit, OnDestroy {
  @Input() type = 'text';
  @Input() value: string | number;
  @Input() selectText = true;
  @Input() saveOption: 'onedit'|'focusout' = 'onedit';
  @Input() debounceTime = 500;
  @Input() placeholder: string;
  @Output() onValueChanged: EventEmitter<number | string> = new EventEmitter<number | string>();

  editMode = false;
  inputTextControl: FormControl;
  private latestEmittedValue = '';
  private formSubscription: Subscription;

  @HostListener('click', ['$event.target']) onClick(_) {
    this.editMode = true;
  }

  constructor() { }

  ngOnInit() {
    this.inputTextControl = new FormControl(this.value);
    if (this.saveOption === 'onedit') {
      this.formSubscription = this.inputTextControl.valueChanges.pipe(debounceTime(this.debounceTime))
      .subscribe(value => {
        this.emitValueIfChanged(value);
      });
    }
  }

  onFocusOut(value: string) {
    this.emitValueIfChanged(value);
    this.editMode = false;
  }

  emitValueIfChanged(value: string) {
    if (this.latestEmittedValue !== value) {
      this.latestEmittedValue = value;
      this.onValueChanged.emit(value);
    }
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
