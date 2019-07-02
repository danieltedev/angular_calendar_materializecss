import {
  Directive, Input, OnInit,
  OnDestroy, ElementRef, HostListener,
  Renderer2, OnChanges, SimpleChanges,
  EventEmitter, Output } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[pagination]'
})
export class PaginationDirective implements OnInit, OnDestroy, OnChanges {

  private pageableValue: Pagination<any>;

  // tslint:disable-next-line:no-output-rename
  @Output('paginationChange') pageableChange: EventEmitter<Pagination<any>> = new EventEmitter();

  // tslint:disable-next-line:no-input-rename
  @Input('url') url: string;

  // tslint:disable-next-line:no-input-rename
  @Input('filter') filter: any;

  @Input('pagination')
  get pageable(): Pagination<any> {
    return this.pageableValue;
  }

  set pageable(val) {
    this.pageableValue = val;
    this.pageableChange.emit(this.pageableValue);
  }

  private itens: Array<number>;

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }

  @HostListener('click', ['$event'])
  private click(event: Event) {
    event.preventDefault();
    const itemClicked: Element = (event.target as Element);
    const parentLiClicked: Element = itemClicked.closest('li');
    const itemActive: Element = (this.el.nativeElement as HTMLElement).querySelector('.active');
    let indexItem = Array.from((this.el.nativeElement as Element).children).indexOf(parentLiClicked);

    if (this.itens.length > 0 && (event.target as Element).tagName !== 'UL') {
      this.setActivedItem(parentLiClicked, itemClicked);
      indexItem = this.nextItemActived(itemActive, indexItem);
      indexItem = this.previousItemActived(itemActive, indexItem);
      this.dontSelectedBtnNext(indexItem);
      this.dontSelectedBtnPrevious(indexItem);
      this.removeActivedOfItem(itemActive, itemClicked, indexItem);

      if (itemClicked.textContent !== '' || itemClicked.textContent !== undefined || itemClicked.textContent !== null) {
        this.requestNewContent();
      }
    }
  }

  private requestNewContent() {
    const currencyItemActive: Element = (this.el.nativeElement as HTMLElement).querySelector('.active');
    // tslint:disable-next-line:radix
    this.filter.page = this.itens.indexOf(parseInt(currencyItemActive.textContent));
  }

  dontSelectedBtnPrevious(indexItem: number): boolean {
    if (indexItem === 1) {
      this.render.addClass(this.el.nativeElement.firstChild, 'disabled');
      this.render.removeClass(this.el.nativeElement.firstChild, 'waves-effect');
      return true;
    }

    if (indexItem > 1) {
      this.render.removeClass(this.el.nativeElement.firstChild, 'disabled');
      this.render.addClass(this.el.nativeElement.firstChild, 'waves-effect');
    }
    return false;
  }

  dontSelectedBtnNext(indexItem: number): boolean {
    // tslint:disable-next-line:triple-equals
    if (indexItem == this.itens.length) {
      this.render.addClass(this.el.nativeElement.lastChild, 'disabled');
      this.render.removeClass(this.el.nativeElement.lastChild, 'waves-effect');
      return true;
    }

    if (indexItem < this.itens.length) {
      this.render.removeClass(this.el.nativeElement.lastChild, 'disabled');
      this.render.addClass(this.el.nativeElement.lastChild, 'waves-effect');
    }
    return false;
  }

  previousItemActived(itemActive: Element, indexItem: number): number {
    // tslint:disable-next-line:radix
    if (indexItem === 0 && parseInt(itemActive.textContent) > 1) {
      const nextItemActive: Element = (itemActive.previousSibling as Element);
      this.render.addClass(nextItemActive, 'active');
      this.render.removeClass(nextItemActive, 'waves-effect');
      indexItem = Array.from((this.el.nativeElement as Element).children).indexOf(nextItemActive);
    }
    return indexItem;
  }

  nextItemActived(itemActive: Element, indexItem: number): number {
    // tslint:disable-next-line:radix
    if (indexItem === this.itens.length + 1 && parseInt(itemActive.textContent) < this.itens.length) {
      const nextItemActive: Element = (itemActive.nextSibling as Element);
      this.render.addClass(nextItemActive, 'active');
      this.render.removeClass(nextItemActive, 'waves-effect');
      indexItem = Array.from((this.el.nativeElement as Element).children).indexOf(nextItemActive);
    }
    return indexItem;
  }

  removeActivedOfItem(itemActive: Element, itemClicked: Element, indexItem: number) {
    if (itemActive && itemClicked.tagName.toLowerCase() !== 'ul' && indexItem > 0 && indexItem < this.itens.length + 1) {
      this.render.removeClass(itemActive, 'active');
      this.render.addClass(itemActive, 'waves-effect');
    }
  }

  setActivedItem(parentLiClicked: Element, itemClicked: Element) {
    if (parentLiClicked && itemClicked.textContent !== '') {
      this.render.addClass(parentLiClicked, 'active');
      this.render.removeClass(parentLiClicked, 'waves-effect');
    }
  }

  createElementLi(value: any): any {
    const li = this.render.createElement('li');
    const a = this.render.createElement('a');
    const txt = this.render.createText(value);
    this.render.appendChild(a, txt);
    this.render.appendChild(li, a);
    this.render.addClass(li, value === this.pageable.number + 1 ? 'active' : 'waves-effect');
    this.render.addClass(li, 'hide');
    return li;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageable) {
      this.pageable = changes.pageable.currentValue;

      Array.from((this.el.nativeElement as Element).children).forEach(child => {
        if (child.textContent) {
          child.remove();
        }
      });

      const first = this.pageable.number - 4;
      const last = this.pageable.number;

      this.itens = Array(this.pageable.totalPages).fill(1).map((x, y) => x + y);
      this.itens.forEach((e) => {
        const li = this.createElementLi(e);
        if (e <= 4 && first < 0) {
          this.render.removeClass(li, 'hide');
        } else if (e > 4 && first >= 0 && (last <= 4 || last <= this.pageable.number)) {
          this.render.removeClass(li, 'hide');
        }
        this.render.insertBefore(this.el.nativeElement, li, this.el.nativeElement.lastChild);
      });
    }
  }

  ngOnDestroy(): void {
  }

}
