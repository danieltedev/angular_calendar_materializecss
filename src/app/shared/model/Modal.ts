interface Modal {
  el?: Element;
  options?: ModalOptions;
  isOpen?: boolean;
  id?: string;
  open(): void;
  close(): void;
  destroy(): void;
}
