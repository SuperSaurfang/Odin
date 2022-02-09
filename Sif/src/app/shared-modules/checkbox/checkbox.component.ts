import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  public checked = faCheckSquare;
  public unchecked = faSquare;
  public indeterminate = faMinusSquare;

  @Input()
  public isIndeterminate = false;

  @Input()
  public isChecked = false;

  @Input()
  public label = '';

  @Output()
  public change = new EventEmitter<boolean>();

  controlValueAccessorChangeFn = (_: any) => { };
  controlValueAccessorOnTouchedFn = (_: any) => { };

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    if (value) {
      this.isChecked = value;
    }
  }

  registerOnChange(fn: any): void {
    this.controlValueAccessorChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.controlValueAccessorOnTouchedFn = fn;
  }

  public onClick(event: MouseEvent) {
    this.isChecked = !this.isChecked;
    event.stopPropagation();
    this.controlValueAccessorChangeFn(this.isChecked);
    this.change.emit(this.isChecked);
  }

  public onChange(event: Event) {
    event.stopPropagation();
  }
}
