interface Pagination<T> {
  content?: Array<T>;
  pageable?: object;
  totalElements?: number;
  last?: boolean;
  totalPages?: number;
  size?: number;
  number?: number;
  sort?: object;
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
}
