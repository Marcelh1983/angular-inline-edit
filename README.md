
Angular Inline Edit
=================================================================

Copied from <a href="https://stackblitz.com/edit/angular-inline-edit?file=src%2Fapp%2Fedit-input%2Fedit-input.component.ts">@skobak</a>

<a href="">Changes</a>
## Installation

```sh
npm install ngx-inline-edit --save
```

## Usage

#### 1. Import `NgxEditInlineModule` 

```ts
@NgModule({
    imports: [NgxEditInlineModule]
  })
  export class AppModule { }
```

#### 2. Add edit-inline to component:

```html
<ngx-edit-inline [value]="activity?.name" (onValueChanged)="changedValue($event)"></ngx-edit-inline>
```
