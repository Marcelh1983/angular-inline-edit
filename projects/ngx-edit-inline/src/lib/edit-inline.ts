import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

export type SaveOption = 'onedit' | 'focusout';

@Component({
  selector: 'ngx-edit-inline',
  templateUrl: './edit-inline.html',
  styleUrl: './edit-inline.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'disabled() || editMode() ? null : "button"',
    '[attr.tabindex]': 'disabled() || editMode() ? null : 0',
    '[attr.aria-label]': 'editMode() ? null : ariaLabel()',
    '[class.ngx-edit-inline--disabled]': 'disabled()',
    '(click)': 'startEdit()',
    '(keydown.enter)': 'onActivateKey($event)',
    '(keydown.space)': 'onActivateKey($event)',
  },
})
export class NgxEditInline {
  readonly type = input<'text' | 'number' | 'email' | 'tel' | 'url' | 'date'>('text');
  readonly value = model<string | number | null>(null);
  readonly selectText = input(true, { transform: booleanAttribute });
  readonly saveOption = input<SaveOption>('onedit');
  readonly debounceTime = input(500, { transform: numberAttribute });
  readonly placeholder = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | null>(null);

  /** Emits the new value. Use two-way `[(value)]` binding as an alternative. */
  readonly valueChanged = output<string | number | null>();

  readonly editMode = signal(false);
  readonly displayValue = computed(() => {
    const value = this.value();
    return value === null || value === '' ? this.placeholder() : `${value}`;
  });
  readonly isPlaceholder = computed(() => {
    const value = this.value();
    return value === null || value === '';
  });

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');
  private lastEmitted: string | number | null = null;
  private valueBeforeEdit: string | number | null = null;
  private debounceHandle: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    afterRenderEffect(() => {
      const el = this.inputRef()?.nativeElement;
      if (!el) {
        return;
      }
      el.focus();
      if (untracked(this.selectText)) {
        el.select();
      }
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.debounceHandle));
  }

  startEdit(): void {
    if (this.disabled() || this.editMode()) {
      return;
    }
    this.lastEmitted = this.value();
    this.valueBeforeEdit = this.value();
    this.editMode.set(true);
  }

  onActivateKey(event: Event): void {
    if (this.editMode()) {
      return;
    }
    event.preventDefault();
    this.startEdit();
  }

  onInput(rawValue: string): void {
    if (this.saveOption() !== 'onedit') {
      return;
    }
    clearTimeout(this.debounceHandle);
    this.debounceHandle = setTimeout(() => this.commit(rawValue), this.debounceTime());
  }

  onFocusOut(rawValue: string): void {
    clearTimeout(this.debounceHandle);
    this.commit(rawValue);
    this.editMode.set(false);
  }

  onEscape(): void {
    clearTimeout(this.debounceHandle);
    const original = this.valueBeforeEdit;
    this.editMode.set(false);
    if (this.value() !== original) {
      this.value.set(original);
      this.lastEmitted = original;
      this.valueChanged.emit(original);
    }
  }

  private commit(rawValue: string): void {
    const next = this.parse(rawValue);
    if (this.lastEmitted === next) {
      return;
    }
    this.lastEmitted = next;
    this.value.set(next);
    this.valueChanged.emit(next);
  }

  private parse(rawValue: string): string | number | null {
    if (this.type() !== 'number') {
      return rawValue;
    }
    if (rawValue === '') {
      return null;
    }
    const parsed = Number(rawValue);
    return Number.isNaN(parsed) ? null : parsed;
  }
}
