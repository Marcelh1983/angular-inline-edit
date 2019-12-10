import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './autofocus.directive';
import { NgxEditInlineComponent } from './edit-inline.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  imports:      [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [ NgxEditInlineComponent, AutofocusDirective ],
  exports: [ NgxEditInlineComponent, AutofocusDirective ]
})
export class NgxEditInlineModule { }
