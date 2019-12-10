import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  myname = '';
  names = [
    { id: 0, name: 'name 1' },
    { id: 1, name: 'name 2' },
    { id: 2, name: 'name 3' },
    { id: 3, name: 'name 4' }
  ];

  updateMyName(value: string) {
    this.myname = value;
  }

  updateListName(id: number, name: string) {
    this.names = this.names.map(n => n.id === +id ? { ...n, name } : n);
  }

  trackById(index: number, item: {id: number, name: string}) {
    return item.id;
  }
}
