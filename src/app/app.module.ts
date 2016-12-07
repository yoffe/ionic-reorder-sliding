import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { ShoppinglistPage } from '../pages/shoppinglist/shoppinglist';
import { Data } from '../providers/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    ShoppinglistPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    ShoppinglistPage
  ],
  providers: [Storage, Data, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
