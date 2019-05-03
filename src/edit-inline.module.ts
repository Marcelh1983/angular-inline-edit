import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AutofocusDirective } from './autofocus.directive';
import { NgxEditInlineComponent } from './edit-inline.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule],
  declarations: [ NgxEditInlineComponent, AutofocusDirective ],
  exports: [ NgxEditInlineComponent, AutofocusDirective ]
})
export class NgxEditInlineModule { }
