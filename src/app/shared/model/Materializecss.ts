import * as Materialize from 'materialize-css';
import { ElementRef } from '@angular/core';

export class MaterializeCss {

  static Modal = class {
    public static init(el: ElementRef, options: ModalOptions): Modal {
      return Materialize.Modal.init(el.nativeElement, options as any) as Modal;
    }
  };

  static Datepicker = class {
    public static init(el: ElementRef, options: DatepickerOption): Datepicker {
      return Materialize.Datepicker.init(el.nativeElement, options as any) as Datepicker;
    }
  };

  static Timepicker = class {
    public static init(el: ElementRef, options: TimepickerOption): Timepicker {
      return Materialize.Timepicker.init(el.nativeElement, options as any) as Timepicker;
    }
  };

  static FormSelect = class {
    public static init(el: ElementRef, options: FormSelectOption): FormSelect {
      return Materialize.FormSelect.init(el.nativeElement, options as any) as FormSelect;
    }
  };

  static CharacterCounter = class {
    public static init(el: ElementRef, option: CharacterCounterOption): void {
      Materialize.CharacterCounter.init(el.nativeElement, option as any);
    }
  };

  public static AutoInit(): void {
    Materialize.AutoInit();
  }

  public static updateTextFields(): void {
    Materialize.updateTextFields();
  }

  public static toast(options: any): void {
    Materialize.toast(options);
  }

  public static textareaAutoResize(el: ElementRef) {
    Materialize.textareaAutoResize(el.nativeElement);
  }
}
