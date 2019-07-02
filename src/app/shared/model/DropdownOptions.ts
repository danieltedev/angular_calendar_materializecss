interface DropdownOptions {
  alignment: string;
  autoTrigger: boolean;
  constrainWidth: boolean;
  container: Element;
  coverTrigger: boolean;
  closeOnClick: boolean;
  hover: boolean;
  inDuration: number;
  outDuration: number;
  onOpenStart(): void;
  onOpenEnd(): void;
  onCloseStart(): void;
  onCloseEnd(): void;
}
