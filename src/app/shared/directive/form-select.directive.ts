import { Directive, ElementRef, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterializeCss } from '../model/Materializecss';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[form-select]'
})
export class FormSelectDirective implements OnInit, OnDestroy {

  private instance: any;
  private mutationObserver: MutationObserver;

  @Input('form-select') option: FormSelectOption;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.mutationObserver = this.listenerAttr(this.el);
    // if (this.instance) { this.instance.destroy(); }
    // this.instance = MaterializeCss.FormSelect.init(this.el, this.option);
    console.log(this.instance);
  }

  listenerAttr(el: ElementRef) {
    const obs: MutationObserver = new MutationObserver((ms) => {
      const childrens: Array<any> = Array.from(this.el.nativeElement.children);
      if (ms.length === (childrens.length - 1)) {
        this.instance = MaterializeCss.FormSelect.init(this.el, this.option);
      }
    });
    obs.observe(this.el.nativeElement, {
      childList: true
    });
    return obs;
  }

  ngOnDestroy(): void {
    this.instance.destroy();
    this.mutationObserver.disconnect();
  }
}
