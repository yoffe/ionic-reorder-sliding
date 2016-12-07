import {Observable} from 'rxjs/Observable';

export class ShoppinglistModel {

  shoppinglist: any;
  shoppinglistObserver: any;

  constructor(public title: string,public qty: number, public items: any[]){

    this.items = items;

    this.shoppinglist = Observable.create(observer => {
      this.shoppinglistObserver = observer;
    });

  }

  addItem(title, qty): void {

    this.items.push({
      title: title,
      qty: qty,
      checked: false
    });

    this.shoppinglistObserver.next(true);
  }

  removeItem(item): void {

    let index = this.items.indexOf(item);

    if(index > -1){
      this.items.splice(index, 1);
    }

    this.shoppinglistObserver.next(true);
  }

  renameItem(item, title): void {

    let index = this.items.indexOf(item);

    if(index > -1){
      this.items[index].title = title;
    }

    this.shoppinglistObserver.next(true);
  }

  setTitle(title): void {
    this.title = title;
    this.shoppinglistObserver.next(true);
  }

  toggleItem(item): void {
    item.checked = !item.checked;
    this.shoppinglistObserver.next(true);
  }

}
