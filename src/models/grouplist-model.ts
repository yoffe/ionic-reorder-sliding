import {Observable} from 'rxjs/Observable';

export class GrouplistModel {

  grouplist: any;
  grouplistObserver: any;

  constructor(public title: string, public items: any[]){

    this.items = items;

    this.grouplist = Observable.create(observer => {
      this.grouplistObserver = observer;
    });

  }

  addGroupItem(item): void {

    this.items.push({
      title: item
    });

    this.grouplistObserver.next(true);
  }

  /*renameGroupItem(item, title): void {

    let index = this.items.indexOf(item);

    if(index > -1){
      this.items[index].title = title;
    }

    this.grouplistObserver.next(true);
}*/

  setGroupTitle(title): void {
    this.title = title;
    this.grouplistObserver.next(true);
}

  /****************************/

  addListItem(title, qty): void {

    this.items.push({
      title: title,
      qty: qty,
      checked: false
    });

    this.grouplistObserver.next(true);
  }

  updateListItem(item, title, qty): void {

    let index = this.items.indexOf(item);

    if(index > -1){
      this.items[index].title = title;
      this.items[index].qty = qty;
    }

    this.grouplistObserver.next(true);
  }

  toggleListItem(item): void {
    item.checked = !item.checked;
    this.grouplistObserver.next(true);
  }

  /****************************/

  removeItem(item): void {

    let index = this.items.indexOf(item);

    if(index > -1){
      this.items.splice(index, 1);
    }

    this.grouplistObserver.next(true);
  }


}
