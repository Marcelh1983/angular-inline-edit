# ngx-edit-inline

A tiny, dependency-free inline-edit component for Angular. Click a value, edit it in place, done.

- Standalone component — no `NgModule` needed
- Signal inputs/outputs, `OnPush`, works in zoneless applications
- Two-way `[(value)]` binding
- Keyboard accessible (Enter/Space to edit, Enter to commit, Escape to cancel)
- Themable through CSS custom properties
- Zero runtime dependencies besides Angular

[**Open the live demo on StackBlitz**](https://stackblitz.com/github/Marcelh1983/angular-inline-edit) ·
[Changelog](https://github.com/Marcelh1983/angular-inline-edit/blob/master/changelog.md)

## Installation

```sh
npm install ngx-edit-inline
```

Requires Angular 20 or newer. For Angular 13–19, use `ngx-edit-inline@1`.

## Usage

Import the standalone component where you need it:

```ts
import { Component, signal } from '@angular/core';
import { NgxEditInline } from 'ngx-edit-inline';

@Component({
  selector: 'app-profile',
  imports: [NgxEditInline],
  template: `<ngx-edit-inline [(value)]="name" placeholder="Enter a name" />`,
})
export class Profile {
  readonly name = signal('');
}
```

Or listen to the output instead of using a two-way binding:

```html
<ngx-edit-inline
  [value]="person.name"
  type="text"
  saveOption="onedit"
  [debounceTime]="500"
  [selectText]="true"
  placeholder="Enter a name"
  (valueChanged)="save($event)"
/>
```

## API

### Inputs

| Input          | Type                                                        | Default    | Description                                                                                |
| -------------- | ----------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------ |
| `value`        | `string \| number \| null`                                  | `null`     | Value to display and edit. Supports two-way binding: `[(value)]`.                          |
| `type`         | `'text' \| 'number' \| 'email' \| 'tel' \| 'url' \| 'date'` | `'text'`   | Input type used while editing. `'number'` emits numbers, or `null` when cleared.           |
| `saveOption`   | `'onedit' \| 'focusout'`                                    | `'onedit'` | `onedit` emits while typing (debounced), `focusout` only emits when the field loses focus. |
| `debounceTime` | `number`                                                    | `500`      | Debounce in ms, used when `saveOption` is `'onedit'`.                                      |
| `selectText`   | `boolean`                                                   | `true`     | Selects the existing text when edit mode starts.                                           |
| `placeholder`  | `string`                                                    | `''`       | Shown when the value is empty, both in display and edit mode.                              |
| `disabled`     | `boolean`                                                   | `false`    | Prevents entering edit mode.                                                               |
| `ariaLabel`    | `string \| null`                                            | `null`     | Accessible label for the control.                                                          |

### Outputs

| Output         | Type                       | Description                                                                                               |
| -------------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `valueChanged` | `string \| number \| null` | Emits the new value whenever it is committed or reverted. `null` when a `type="number"` field is cleared. |

## Styling

The component exposes CSS custom properties, so you can theme it without `::ng-deep`:

```css
ngx-edit-inline {
  --ngx-edit-inline-padding: 0.25rem 0.5rem;
  --ngx-edit-inline-radius: 4px;
  --ngx-edit-inline-outline: 1px solid #0a84ff;
  --ngx-edit-inline-placeholder-color: #999;
}
```

Font and colour are inherited from the surrounding element, so the component blends into any layout.

## Migrating from v1

- `NgxEditInlineModule` is gone — import the standalone `NgxEditInline` component instead.
- `NgxEditInlineComponent` was renamed to `NgxEditInline`.
- The `onValueChanged` output was renamed to `valueChanged`.
- `value` is now a two-way bindable model input.
- `AutofocusDirective` is no longer exported; focus handling is built into the component.
- Angular 20+ is required.

## Development

This workspace needs Node 22.22.3+, 24.15+ or 26+ — the version in `.nvmrc`. If you use nvm,
run `nvm use` first; otherwise `npm install` stops with an `EBADENGINE` error naming the
required range.

```sh
nvm use             # switch to the Node version in .nvmrc
npm install
npm start           # serve the demo app
npm test            # run unit tests
npm run lint        # lint TypeScript and templates
npm run build       # build the library into dist/ngx-edit-inline
npm run release     # build and publish to npm
```

## License

MIT
