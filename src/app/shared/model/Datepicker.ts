interface Datepicker {
  el: Element;
  options: any;
  isOpen?: boolean;
  date?: Date;
  modal?: Modal;
  destroy(): void;
  destroySelects(): void;
  toString(format: string): string;
  open(): void;
  close(): void;
}
