const DEFAULT_ERROR = 'No item found.';

export class ItemResponse<T> {
  public item: T | null = null;
  public error: string | null = null;

  constructor({ item, error = DEFAULT_ERROR }: { item?: T; error?: string }) {
    if (item) {
      this.item = item;
    } else {
      this.error = error;
    }
  }

  public static create<E>({
    item,
    error = DEFAULT_ERROR,
  }: {
    item?: E;
    error?: string;
  }): ItemResponse<E> {
    return new ItemResponse<E>({ item, error });
  }
}
