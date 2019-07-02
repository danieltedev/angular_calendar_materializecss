import { Directive, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { MaterializeCss } from '../model/Materializecss';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[modal]'
})
export class ModalDirective implements OnInit, OnDestroy, OnChanges {

  private instance: Modal;
  private openValue: boolean;

  @Input('modal') options: ModalOptions;

  // tslint:disable-next-line:no-output-rename
  @Output('openChamge') openChamge: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('open')
  get open(): boolean {
    return this.openValue;
  }

  set open(value: boolean) {
    this.openValue = value;
    this.openChamge.next(this.openValue);
  }

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.instance.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.open = changes.open.currentValue;
    this.instance = MaterializeCss.Modal.init(this.el, this.options);
    const body: HTMLBodyElement = (this.el.nativeElement as Element).closest('body');

    if (this.open) {
      this.instance.open();
      setTimeout(() => {
        MaterializeCss.updateTextFields();
      }, 500);
    } else {
      this.instance.close();
    }

    if (body.attributes.getNamedItem('style')) {
      body.attributes.removeNamedItem('style');
    }
  }

}
