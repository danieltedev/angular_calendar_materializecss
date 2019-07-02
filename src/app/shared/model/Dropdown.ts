interface Dropdown {
  dropdownEl: Element;
  el: Element;
  options: DropdownOptions;
  filterQuery: Array<any>;
  focusedIndex: number;
  id: string;
  isOpen: boolean;
  isScrollable: boolean;
  isTouchMoving: boolean;
  close(): void;
  destroy(): void;
  open(): void;
  recalculateDimensions(): void;
}
