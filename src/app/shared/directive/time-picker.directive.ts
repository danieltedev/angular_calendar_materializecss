import { Directive, ElementRef, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MaterializeCss } from '../model/Materializecss';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[timepicker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TimePickerDirective,
    multi: true
  }]
})
export class TimePickerDirective implements OnInit, OnDestroy, ControlValueAccessor {

  private instance: Timepicker;

  @Input('timepicker') option: TimepickerOption;

  onTouched: any;
  onChange: any;

  constructor(private el: ElementRef) { }

  writeValue(obj: any): void {
    this.el.nativeElement.value = obj === null || obj === undefined || obj === '' ? null : this.el.nativeElement.value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('change')
  oncuechange() {
    if (this.instance.time !== undefined && this.instance.time !== null && this.instance.time !== '') {
      const time = new Date();
      time.setHours(this.instance.hours, this.instance.minutes, 0);
      this.onChange(time);
    }
  }

  ngOnInit(): void {
    this.instance = MaterializeCss.Timepicker.init(this.el, this.option);
  }

  ngOnDestroy(): void {
    this.instance.destroy();
  }

}
