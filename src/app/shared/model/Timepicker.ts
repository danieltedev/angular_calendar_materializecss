interface Timepicker {
  el?: Element;
  options?: TimepickerOption;
  time?: string;
  hours?: number;
  minutes?: number;
  isOpen(): boolean;
  destroy(): void;
}
