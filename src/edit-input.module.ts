import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AutofocusDirective } from './autofocus.directive';
import { EditInputComponent } from './edit-input.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule],
  declarations: [ EditInputComponent, AutofocusDirective ]
})
export class EditInputModule { }
