import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Quote } from '../../data/quote.interface';

import { QuotesService } from '../../services/quotes.service';
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private quotesService: QuotesService) {
  }
  quoteGroup:{category: string, quotes:Quote[], icon: string};
  ngOnInit(){
    this.quoteGroup = this.navParams.data;
  }
  // ionViewDidLoad(){
  //   this.quoteGroup = this.navParams.data;
  //   //Add Elvisoperator (?) in the template to use this approach
  // }

  onAddToFavorites(selectedQuote: Quote){
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons:[
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quotesService.addQuoteToFavorites(selectedQuote);
          }
        },
        {
          text: 'No, Cancel',
          role: 'cancel',
          handler: () => {
            console.log("canceled");
          }
        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavorites(quote: Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote){
    return this.quotesService.isQuoteFavorite(quote);
  }

}
