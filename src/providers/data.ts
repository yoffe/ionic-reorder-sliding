import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Data {

  constructor(public storage: Storage) {

  }

  getData(): Promise<any> {
    return this.storage.get('grouplist');
  }

  save(data): void {

    let saveData = [];

    //Remove observables
    data.forEach((group) => {
      saveData.push({
        title: group.title,
        items: group.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('grouplist', newData);
  }
}
