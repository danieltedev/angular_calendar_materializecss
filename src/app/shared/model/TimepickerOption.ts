interface TimepickerOption {
  duration?: number;
  container?: string;
  showClearBtn?: boolean;
  defaultTime?: string;
  fromNow?: number;
  i18n?: I18n;
  autoClose?: boolean;
  twelveHour?: boolean;
  vibrate?: boolean;
  onOpenStart(): void;
  onOpenEnd(): void;
  onCloseStart(): void;
  onCloseEnd(): void;
  onSelect(): void;
}
