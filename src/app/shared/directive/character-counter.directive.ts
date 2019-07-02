import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { MaterializeCss } from '../model/Materializecss';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[character-counter]'
})
export class CharacterCounterDirective implements OnInit {

  @Input('character-counter') options: any;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    MaterializeCss.CharacterCounter.init(this.el, this.options);
  }

}
