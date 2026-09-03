import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgxEditInline } from 'ngx-edit-inline';

interface Person {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-root',
  imports: [NgxEditInline],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly myName = signal('');
  readonly lastEvent = signal('—');

  readonly people = signal<Person[]>([
    { id: 0, name: 'Ada Lovelace', age: 36 },
    { id: 1, name: 'Grace Hopper', age: 85 },
    { id: 2, name: 'Alan Turing', age: 41 },
    { id: 3, name: 'Katherine Johnson', age: 101 },
  ]);

  onNameChanged(value: string | number | null) {
    this.lastEvent.set(`valueChanged: ${JSON.stringify(value)}`);
  }

  renamePerson(id: number, value: string | number | null) {
    this.updatePerson(id, { name: value === null ? '' : `${value}` });
  }

  setPersonAge(id: number, value: string | number | null) {
    this.updatePerson(id, { age: typeof value === 'number' ? value : 0 });
  }

  private updatePerson(id: number, patch: Partial<Person>) {
    this.people.update((people) => people.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
}
