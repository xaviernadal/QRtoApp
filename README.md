# Config
plugin: https://github.com/Pantrist-dev/capacitor-firebase-dynamic-links


## Android
1. app/build.gradle:
``` java
dependencies {
    // Import the BoM for the Firebase platform
    implementation platform('com.google.firebase:firebase-bom:30.2.0')

    // Declare the dependencies for the Dynamic Links and Analytics libraries
    // When using the BoM, you don't specify versions in Firebase library dependencies
    implementation 'com.google.firebase:firebase-dynamic-links'
    implementation 'com.google.firebase:firebase-analytics'
}
```

2. manifest.xml:
```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data
        android:host="example.com"
        android:scheme="https"/>
</intent-filter>
```

## iOS

1. A l'AppDelegate: 

```swift
import UIKit
import Capacitor
import FirebaseCore                                     //afegir
import FirebaseDynamicLinks                             //afegir

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.

        FirebaseApp.configure()                         //afegir
        return true
    }
```

2. A la pestanya de "Info" a la configuració de la app del Xcode, a baix de tot, URL Types, a "URL Schemes" s'ha de posar el nom del paquet (exemple: io.ionic.starter), i a "identifier" assignar-li un valor únic.

3. A la pestanya "Signing & Capabilities" s'ha d'afegir "Associated Domains". S'ha d'agregar un domini amb el format: applinks:<your_dynamic_links_domain>. En el meu cas era: applinks:qrtoapp.page.link

4. Extra:
Si fas servir un domini personalitzat, a l'arxiu Info.plist s'ha d'afegir una clau amb el nom FirebaseDynamicLinksCustomDomains i afegir els prefixos dels URLs Dinàmics de la app.
``` plist
<key>FirebaseDynamicLinksCustomDomains</key>
<array>
  <string>https://example.com/link</string>
  <string>https://example.com/promos</string>
</array>

```

## Firebase
1. Crear projecte amb Android i iOS

No cal seguir les instruccions que et dona sobre afegir Firebase a les apps, només les de descarregar els arxius de configuració i afegir-los al projecte, els altres passos no.

2. Participación/Dynamic Links. Comenzar. Afegir el domini (segurament sigui personalitzat i s'haurà de validar, jo feia servir el que el et dona firebase per defecte).


3. Afegir Link Dinàmic. 
    - URL curta: el prefix es el domini. El link complet és el link que redirigirà l'usuari on sigui.
    - configurar URL: És el link on anirà que funcionarà si o si, encara que també vagi a la app a al vegada.
    - Comportament en apple: Afegir la aplicació i posar "Abrir el vínculo directo en la app para apple".
    - El mateix per a Android.


## Codi + plugin dynamic links capacitor 
Com que l'aplicació només rep el dynamic link, només es necessiten listeners.
imports: 
``` ts
import {
  FirebaseDynamicLinks,
  LinkConfig,
} from '@pantrist/capacitor-firebase-dynamic-links';
```


 Exemple:
 ```ts
ngOnInit() {
    this.listenToDeepLinkOpen();
  }

  listenToDeepLinkOpen() {
    FirebaseDynamicLinks.addListener('deepLinkOpen', (data: { url: string }) => {
        this.showAlert(data.url);
    });
    
  ```

  Més info: 
  https://github.com/Pantrist-dev/capacitor-firebase-dynamic-links


  ## Link dinàmic:
En el meu cas era:

https://qrtoapp.page.link/?link=http://qrtoapp.page.link/app&apn=io.ionic.qrtoapp&ibi=io.ionic.qrtoapp

Significa:
- https://qrtoapp.page.link -> domini
- ?link= a partir d'aqui és el que rep el "data.url" del listener.
- http://qrtoapp.page.link -> El que rep "data.url". També és la direcció que activa el link dinàmic.
- &apn=io.ionic.qrtoapp -> el nom del paquet de la aplicació de android. Obrirà la aplicació. Si no la troba, va al play store. (Dependrà de la configuració de Firebase)
- &ibi=io.ionic.qrtoapp -> El mateix per a la aplicació en iOS

## Domini personalitzat
Com he dit, jo feia servir el domini per defecte de firebase, hi ha més informació respecte els dominis personals que no he pogut seguir aquí:


https://firebase.google.com/docs/dynamic-links/custom-domains?authuser=0
