import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { MaterializeCss } from '../model/Materializecss';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[textarea]'
})
export class TextAreaDirective implements OnInit {

  @Input('textarea') options: TextAreaOption;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.options.autoResize) {
      setTimeout(() => {
        MaterializeCss.textareaAutoResize(this.el);
      }, 500);
    }
  }
}
