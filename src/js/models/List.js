import uniqid from 'uniqid';
export default class List {
  constructor() {
    // initializes item list
    this.items = [];
  }

  //method for adding item to items
  addList(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.items.push(item);
    return item;
  }
  removeList(id) {
    //find item position with the id passed
    const itemId = this.items.findIndex((el) => el.id === id);

    //remove item from the list
    this.items.splice(itemId, 1);
  }
  updateCount(id, newCount) {
    //find the item
    const item = this.items.find((el) => el.id === id);
    //update the count property of the item
    item.count = newCount;
  }
}
