import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from './autofocus.directive';
import { NgxEditInlineComponent } from './edit-inline.component';
@NgModule({
  imports:      [ CommonModule, FormsModule],
  declarations: [ NgxEditInlineComponent, AutofocusDirective ],
  exports: [ NgxEditInlineComponent, AutofocusDirective ]
})
export class NgxEditInlineModule { }
