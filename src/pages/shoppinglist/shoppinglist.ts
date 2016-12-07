import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html'
})
export class ShoppinglistPage {

  shoppinglist: any;
  modifiedShoppinglist: any;
  showHideItems: boolean = false;
  orderItems: boolean = false;
  
  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.shoppinglist = this.navParams.get('grouplist');
  }

  reorderTasks(indexes) {
      this.shoppinglist.items = reorderArray(this.shoppinglist.items, indexes);
      console.log(indexes);
  }

  /*reorderItems(indexes) {
     let element = this.shoppinglist.items[indexes.from];
     this.shoppinglist.items.splice(indexes.from, 1);
     this.shoppinglist.items.splice(indexes.to, 0, element);
 }*/
  addItem(): void {

    let prompt = this.alertCtrl.create({
      title: 'הוספת פריט',
      message: 'רשמו את שם הפריט וכמות',
      cssClass: 'alert_rtl',
      inputs: [
        {
          name: 'name',
          placeholder: 'שם',
          type: 'string'

        },
        {
          name: 'qty',
          placeholder: 'כמות',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.shoppinglist.addListItem(data.name, data.qty);
          }
        }
      ]
    });

    prompt.present();

  }

  renameItem(item): void {

    let prompt = this.alertCtrl.create({
      title: 'עדכון פריט',
      message: 'עדכנו את נתוני הפריט',
      cssClass: 'alert_rtl',
      inputs: [
        {
          name: 'name',
          value: item.title,
          type: 'string'

        },
        {
          name: 'qty',
          value: item.qty,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.shoppinglist.updateListItem(item, data.name, data.qty);
          }
        }
      ]
    });

    prompt.present();

  }

  toggleItem(item): void {
    this.shoppinglist.toggleListItem(item);
  }

  removeItem(item): void {

    let confirm = this.alertCtrl.create({
      title: 'מחיקת פריט?',
      message: 'האם למחוק את הפריט: ' + item.title,
      cssClass: 'alert_rtl',
      buttons: [
        {
          text: 'ביטול',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'מחיקה',
          handler: () => {
            console.log('Agree clicked');
            this.shoppinglist.removeItem(item);
          }
        }
      ]
    });

    confirm.present();

  }

  uncheckItems(): void {

    let confirm = this.alertCtrl.create({
      title: 'איפוס הרשימה',
      message: 'בטוחים שברצונכם לאפס את הרשימה?',
      cssClass: 'alert_rtl',
      buttons: [
        {
          text: 'ביטול',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'אפס',
          handler: () => {
            console.log('Agree clicked');
            this.shoppinglist.items.forEach((item) => {
              if (item.checked) {
                this.shoppinglist.toggleListItem(item);
              }
            });
          }
        }
      ]
    });

    confirm.present();

  }

  toggleShowHide(){
      this.showHideItems = !this.showHideItems;
  }

  toggleOrder(){
      this.orderItems = !this.orderItems;
  }

}
