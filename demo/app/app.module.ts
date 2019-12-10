import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxEditInlineModule } from 'modules';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxEditInlineModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
