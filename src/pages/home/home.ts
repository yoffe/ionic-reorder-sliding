import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from 'ionic-native';
import { ShoppinglistPage } from '../shoppinglist/shoppinglist';
import { GrouplistModel } from '../../models/grouplist-model';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  grouplist: GrouplistModel[] = [];

  constructor(public nav: NavController, public dataService: Data, public alertCtrl: AlertController, public storage: Storage, public platform: Platform) {
    //this.platform.setDir('rtl',true);
  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {

      this.dataService.getData().then((grouplist) => {

        let savedGrouplists: any = false;

        if (typeof (grouplist) != "undefined") {
          savedGrouplists = JSON.parse(grouplist);
        }

        if (savedGrouplists) {

          savedGrouplists.forEach((savedGrouplists) => {

            let loadGrouplist = new GrouplistModel(savedGrouplists.title, savedGrouplists.items);
            this.grouplist.push(loadGrouplist);

            loadGrouplist.grouplist.subscribe(update => {
              this.save();
            });

          });

        }

      });

    });

  }

  addGrouplist(): void {
    let prompt = this.alertCtrl.create({
      title: 'רשימה חדשה',
      message: 'הזינו את שם הרשימה',
      cssClass: 'alert_rtl',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'ביטול'
        },
        {
          text: 'שמירה',
          handler: data => {
            let newGrouplist = new GrouplistModel(data.name, []);
            this.grouplist.push(newGrouplist);

            newGrouplist.grouplist.subscribe(update => {
              this.save();
            });

            this.save();
          }
        }
      ]
    });

    prompt.present();
  }

  renameGrouplist(grouplist): void {

    let prompt = this.alertCtrl.create({
      title: 'עריכת שם',
      message: 'הזינו שם חדש לרשימה',
      cssClass: 'alert_rtl',
      inputs: [
        {
          name: 'name',
          value: grouplist.title
        }
      ],
      buttons: [
        {
          text: 'ביטול'
        },
        {
          text: 'שמירה',
          handler: data => {

            let index = this.grouplist.indexOf(grouplist);

            if (index > -1) {
              this.grouplist[index].setGroupTitle(data.name);
              this.save();
            }

          }
        }
      ]
    });

    prompt.present();

  }

  removeItem(grouplist): void {

    let confirm = this.alertCtrl.create({
      title: 'מחיקת רשימה?',
      message: 'האם אתם בטוחים שברצונכם למחוק את הרשימה: ' + grouplist.title,
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
            let index = this.grouplist.indexOf(grouplist);

            if (index > -1) {
              this.grouplist.splice(index, 1);
              this.save();
            }
          }
        }
      ]
    });

    confirm.present();


  }

  viewGrouplist(grouplist): void {
    this.nav.push(ShoppinglistPage, {
      grouplist: grouplist
    });
  }

  save(): void {
    Keyboard.close();
    this.dataService.save(this.grouplist);
    console.log("save");
  }

  countMe(grouplist): number {

    let count = grouplist.items.length;
    grouplist.items.forEach((item) => {
      if (item.checked) {
        count--;
      }
    });

    return count;
  }

}
