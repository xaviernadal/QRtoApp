import { Component } from '@angular/core';
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

  constructor() {}
  ngOnInit() {
    this.listenToDeepLinkOpen();
  }

  listenToDeepLinkOpen() {
    FirebaseDynamicLinks.addListener('deepLinkOpen', (data: { url: string }) => {
        console.log(data);
    });
    
  }

}
