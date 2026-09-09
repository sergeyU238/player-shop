const DEFAULT_ERROR = 'No item found.';

export class ItemResponse<T> {
  public item: T | null = null;
  public error: string | null = null;

  constructor(item: T, error = DEFAULT_ERROR) {
    if (item) {
      this.item = item;
    } else {
      this.error = error;
    }
  }

  public static create<E>(item: E, error = DEFAULT_ERROR) {
    return new ItemResponse<E>(item, error);
  }
}
