import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NgxEditInline, SaveOption } from './edit-inline';

@Component({
  imports: [NgxEditInline],
  template: `@if (show()) {
    <ngx-edit-inline
      [(value)]="value"
      [type]="type()"
      [saveOption]="saveOption()"
      [debounceTime]="0"
      [disabled]="disabled()"
      placeholder="empty"
    />
  }`,
})
class Host {
  readonly value = signal<string | number | null>('hello');
  readonly type = signal<'text' | 'number'>('text');
  readonly saveOption = signal<SaveOption>('onedit');
  readonly disabled = signal(false);
  readonly show = signal(true);
}

describe('NgxEditInline', () => {
  let fixture: ComponentFixture<Host>;

  const host = () => fixture.nativeElement.querySelector('ngx-edit-inline') as HTMLElement;
  const input = () => fixture.nativeElement.querySelector('input') as HTMLInputElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
  });

  it('renders the value as text until clicked', () => {
    expect(input()).toBeNull();
    expect(host().textContent?.trim()).toBe('hello');
  });

  it('shows the placeholder when the value is empty', () => {
    fixture.componentInstance.value.set('');
    fixture.detectChanges();
    expect(host().textContent?.trim()).toBe('empty');
  });

  it('switches to an input on click', () => {
    host().click();
    fixture.detectChanges();
    expect(input()).not.toBeNull();
  });

  it('is keyboard accessible', () => {
    expect(host().getAttribute('role')).toBe('button');
    expect(host().getAttribute('tabindex')).toBe('0');

    host().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(input()).not.toBeNull();
  });

  it('does not switch to an input when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    host().click();
    fixture.detectChanges();
    expect(input()).toBeNull();
  });

  it('emits and updates the model after the debounce time', () => {
    vi.useFakeTimers();
    host().click();
    fixture.detectChanges();

    const el = input()!;
    el.value = 'world';
    el.dispatchEvent(new Event('input'));
    vi.advanceTimersByTime(1);
    vi.useRealTimers();

    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('world');
  });

  it('does not emit while editing when saveOption is focusout', () => {
    fixture.componentInstance.saveOption.set('focusout');
    fixture.detectChanges();
    vi.useFakeTimers();
    host().click();
    fixture.detectChanges();

    const el = input()!;
    el.value = 'world';
    el.dispatchEvent(new Event('input'));
    vi.advanceTimersByTime(1000);
    vi.useRealTimers();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('hello');

    el.dispatchEvent(new Event('focusout'));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('world');
  });

  it('reverts the value on escape', () => {
    host().click();
    fixture.detectChanges();

    const el = input()!;
    el.value = 'changed';
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('hello');
    expect(input()).toBeNull();
  });

  it('renders numbers for type="number"', () => {
    fixture.componentInstance.value.set(1);
    fixture.detectChanges();
    host().click();
    fixture.detectChanges();
    expect(input()!.value).toBe('1');
  });

  it('emits null when a number field is cleared', () => {
    fixture.componentInstance.type.set('number');
    fixture.componentInstance.value.set(1);
    fixture.detectChanges();

    vi.useFakeTimers();
    host().click();
    fixture.detectChanges();

    const el = input()!;
    el.value = '';
    el.dispatchEvent(new Event('input'));
    vi.advanceTimersByTime(1);
    vi.useRealTimers();

    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBeNull();
  });

  it('focuses and selects the input when edit mode starts', async () => {
    host().click();
    await fixture.whenStable();

    const el = input()!;
    expect(document.activeElement).toBe(el);
    expect(el.selectionStart).toBe(0);
    expect(el.selectionEnd).toBe(el.value.length);
  });

  it('drops the ARIA button role while editing so the input is exposed', () => {
    host().click();
    fixture.detectChanges();
    expect(host().getAttribute('role')).toBeNull();
    expect(host().getAttribute('tabindex')).toBeNull();
  });

  it('cancels a pending debounce when destroyed', async () => {
    const warn = vi.spyOn(console, 'warn');
    host().click();
    fixture.detectChanges();

    const el = input()!;
    el.value = 'world';
    el.dispatchEvent(new Event('input'));

    fixture.componentInstance.show.set(false);
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
