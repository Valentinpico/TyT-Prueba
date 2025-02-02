import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  template: `
    <div class="mb-4">
      @if ( label ) {
      <label htmlFor="{name}" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      }

      <input
        type="{{ type }}"
        name="{{ name }}"
        id="{{ name }}"
        value="{{ value }}"
        (change)="changeValue($event)"
        placeholder="{{ placeholder }}"
        required="{{ required }}"
        class="{{ class }}"
      />

      @if ( error ) {
      <p class="mt-2 text-sm text-red-600" id="{{ name }}-error">
        este campo es requerido
      </p>
      }
    </div>
  `,
  styles: ``,
})
export class InputComponent {
  @Input() label: String = 'Ejemplo';
  @Input() name: String = '';
  @Input() type: String = 'text';
  @Input() placeholder: String = '';
  @Input() value: String = '';
  @Input() onChange: (e: Event) => void = () => {};
  @Input() required: String = '';
  @Input() class: String = '';

  @Input() error: boolean = false;

  @Output() input = new EventEmitter<Event>();

  changeValue(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.input.emit(e);
    this.onChange(e);
  }
}
