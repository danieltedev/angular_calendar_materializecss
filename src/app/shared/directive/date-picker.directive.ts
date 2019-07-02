import { Directive, ElementRef, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaterializeCss } from '../model/Materializecss';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datepicker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DatePickerDirective,
    multi: true
  }]
})
export class DatePickerDirective implements OnInit, OnDestroy, ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input('datepicker') option: DatepickerOption;

  private instance: Datepicker;

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

  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error("Method not implemented.");
  // }

  @HostListener('change')
  oncuechange() {
    this.onChange(this.instance.date);
  }

  ngOnInit(): void {
    this.instance = MaterializeCss.Datepicker.init(this.el, this.option);
    this.instance.modal.options.onCloseEnd = () => {
      this.instance.close();
    };
  }

  ngOnDestroy(): void {
    this.instance.destroy();
  }

}
