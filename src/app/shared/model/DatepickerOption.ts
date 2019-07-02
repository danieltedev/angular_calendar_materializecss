interface DatepickerOption {
  autoClose?: boolean;
  format?: string;
  defaultDate?: Date;
  setDefaultDate?: boolean;
  disableWeekends?: boolean;
  firstDay?: number;
  minDate?: Date;
  maxDate?: Date;
  yearRange?: any;
  isRTL?: boolean;
  showMonthAfterYear?: boolean;
  showDaysInNextAndPreviousMonths?: boolean;
  container?: Element;
  showClearBtn?: boolean;
  i18n?: I18n;
  events?: Array<string>;
  onSelect(): any;
  onOpen(): any;
  onClose(): any;
  onDraw(): any;
  disableDayFn(): any;
  parse(): void;

}
