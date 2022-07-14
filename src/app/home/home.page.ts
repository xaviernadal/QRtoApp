import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  FirebaseDynamicLinks,
  LinkConfig,
} from '@pantrist/capacitor-firebase-dynamic-links';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  url_content : string = "";
  
  constructor(private alertController: AlertController) {}
  ngOnInit() {
    this.listenToDeepLinkOpen();
  }

  listenToDeepLinkOpen() {
    FirebaseDynamicLinks.addListener('deepLinkOpen', (data: { url: string }) => {
        this.showAlert(data.url);
    });
    
  }
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Welcome',
      message: message,
      buttons: [{
        text: 'Refresh',
        handler: () => {
          window.location.reload();
        }
      }],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
