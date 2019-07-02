import { TextAreaDirective } from './directive/text-area.directive';
import { CharacterCounterDirective } from './directive/character-counter.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSelectDirective } from './directive/form-select.directive';
import { DatePickerDirective } from './directive/date-picker.directive';
import { ModalDirective } from './directive/modal.directive';
import { PaginationDirective } from './directive/pagination.directive';
import { TimePickerDirective } from './directive/time-picker.directive';

@NgModule({
  declarations: [
    CharacterCounterDirective,
    DatePickerDirective,
    FormSelectDirective,
    ModalDirective,
    PaginationDirective,
    TextAreaDirective,
    TimePickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharacterCounterDirective,
    DatePickerDirective,
    FormSelectDirective,
    ModalDirective,
    PaginationDirective,
    TextAreaDirective,
    TimePickerDirective
  ]
})
export class SharedModule { }
