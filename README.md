


# ngx-edit-inline

This is a very simple inline-edit component for Angular

<a href="https://ngx-edit-inline.firebaseapp.com/">View demo</a>
<a href="https://github.com/Marcelh1983/angular-inline-edit/blob/master/changelog.md">Changes</a>
## Installation

```sh
npm install ngx-edit-inline --save
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
<ngx-edit-inline 
  [value]="person?.name"
  [type]="'text'"
  [saveOption]="'onedit'"
  [debounceTime]="500"
  [selectText]="true"
  [placeholder]="'enter name'"
  (onValueChanged)="changedValue($event)"></ngx-edit-inline>
```

#### 3. API

- type: typ of the input
- value: initial value
- saveOption: onedit: emits changes while editing using debounceTime, focusout: only emits when the focus is set to another element
- placeholder: text shown when 'value' is empty
- selectText: if true it selects the current text onfocus
- onValueChanged(): emits new values