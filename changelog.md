# 22.0.0 (2026-09-03)

Complete rewrite on a modern Angular workspace.

From this release the major version tracks the Angular major the package is built
against, continuing the scheme started with 15.0.0 (Angular 15). The previous
release on npm was 15.0.0; there is no 2.x-21.x.

Breaking changes:

- Requires Angular 20+ (built and tested against Angular 22).
- `NgxEditInlineModule` removed; `NgxEditInline` is now a standalone component.
- `NgxEditInlineComponent` renamed to `NgxEditInline`.
- Output `onValueChanged` renamed to `valueChanged`.
- `AutofocusDirective` is no longer exported; focus handling moved into the component.

New:

- Two-way `[(value)]` binding via a model input.
- `disabled` and `ariaLabel` inputs.
- Keyboard support: Enter/Space to start editing, Enter to commit, Escape to cancel and revert.
- `role="button"` and `tabindex` handling for screen readers and keyboard users.
- Number coercion for `type="number"`; emits `null` when the field is cleared.
- Theming via CSS custom properties; font and colour are inherited.
- `OnPush` change detection, signal-based, zoneless compatible — dropped the `@angular/forms` dependency.
- Unit tests, ESLint (TypeScript + template a11y rules) and a CI workflow.
- Demo moved from Firebase Hosting to StackBlitz.
- `peerDependencies` now declare the supported Angular range; 1.x and 15.0.0 shipped with none.
  Only `@angular/core` is required — the component uses built-in control flow, not `CommonModule`.
- `strict` and `strictTemplates` are enabled workspace-wide.

#1.0.1 (12/10/2019)
added: 'selectText' option to select current text onfocus

#1.0.0 (12/10/2019)
added demo application to test
added option to emit changes while editing
changed styles so they can be overriden

#0.2.0 (12/3/2019)
removed msal package from dependencies (copy paste left over)
upgraded packages

#0.1.6 (5/3/2019)
import commonModule instead of browserModule

#0.1.2 (5/3/2019)
Replace custom gulp files for ng-packagr

# 0.1.0 (5/3/2019)

Initial version
