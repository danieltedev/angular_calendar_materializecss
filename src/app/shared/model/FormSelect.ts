interface FormSelect {
  el: Element;
  options: any;
  isMultiple: boolean;
  wrapper: Element;
  dropdownOptions: DropdownOptions;
  input: Element;
  dropdown: any;
  getSelectedValues(): Array<any>;
  destroy(): void;
}
