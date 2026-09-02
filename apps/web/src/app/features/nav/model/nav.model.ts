export type NavItemDto = {
  name: string;
  id: number;
  parent: number | null;
  url: string;
};

export type NavItem = {
  name: string;
  id: number;
  url: string;
};

export class Nav {
  private readonly itemMap = new Map();

  constructor(items: Array<NavItemDto>) {
    items.forEach((item) => this.mapItem(item));
  }

  public getLevel(levelId: number | null = null): Array<NavItem> {
    return this.itemMap.get(levelId) || [];
  }

  private mapItem(item: NavItemDto) {
    const { parent, ...rest } = item;
    const itemList = this.itemMap.get(parent);
    if (itemList) {
      itemList.push(rest);
    } else {
      this.itemMap.set(parent, [rest]);
    }
  }
}
