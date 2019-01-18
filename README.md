# google-front

Google Sheets (CMS) > Google Apps Script (Service) > G Suite Hub (Autom.) >Firebase Database (DB) > Angular (Front)

# Firebase project

https://firebase.google.com/docs/hosting/quickstart?authuser=0

- create a firebase project
- firebase login
- firebase list
- firebase init
- select hosting (\*)
- select project
- default, not spa
- firebase serve
- firebase deploy

# Google Sheet

- create google sheet file
- fill the sheet with data
- create apps script

# Firebase Database

- create firebase realtime database
- select blocked mode
- set rules on false to write data

# Google Apps Script

- clasp
- clone apps script
- rename to .ts for ES6 features
- import FirebaseApp library
- implement your function
- run first time for checking and push to firebase
- click on activators
- set a new activator for each time the file has edited
-

# Angular

- set output dir in angular.json file to public folder ../public
-

# Setup front and firebase hosting project

- open terminal and create a new Angular project `ng new <project>`
- go to your project folder `cd <project>`
- create a new project in [Firebase Console »](https://console.firebase.google.com/)
- install [Firebase CLI »](https://firebase.google.com/docs/cli) with `npm install -g firebase-tools`
- in your terminal, login into firebase `firebase login` (complete the auth process)
- init firebase project `firebase init`
- select `(*) Hosting` (select with space then press enter)
- select `[don't setup a default project]` (selected by default)
- select `public` folder (selected by default)
- DON'T `configure as a single-page app` (selected by default)
- edit `.firebaserc` and paste the following code

```
{
  "projects": {
    "default": "<your-project-id>"
  }
}
```

- type `firebase list` and copy the project id of your project recently created then replace it in `.firebaserc`
- edit `angular.json` file and replace `outputPath: dist/<project>` with `"outputPath": "public"`
- edit `.gitignore` file and ignore the `/public` folder
- we need to build the frontend then type `npm run build`
- make a deploy to firebase hosting with `firebase deploy`
- open your app browser and go to https://your-project-id.firebaseapp.com/ then you can see the static frontend

> It is a good time for commit your changes. Ignore the `.firebaserc` file before your commit for avoid to expose your firebase project id

# Firebase Database Realtime

- go to [Firebase Console »](https://console.firebase.google.com/) > Database and create a new `Realtime Database` (press next on the pop up)
- in Database go to `Rules` tab and set read value to `true` then Publish the rules on the blue message

# Google Sheet

- create a Google Sheet file in your Google Drive account
- open it and add some title and save (maybe `<your-project>`)
- then fill it with some data like this:

| **console**       | **price** |
| ----------------- | --------- |
| Playstation 4     | 299       |
| Playstation 4 Pro | 400       |
| Xbox One S        | 299       |
| Xbox One X        | 500       |
| Nintendo Switch   | 299       |
| Nintendo 2DS      | 140       |

- then in the toolbar click on `Tools > Apps Script Editor` (it will open a new tab)
- add some title and save, i recomend the same as google sheet title (maybe `<your-project>`)

> We need the Apps Script ID later to clone this project with [Clasp »](https://developers.google.com/apps-script/guides/clasp) and use ES6 features

# Apps Scripts with Clasp

The Apps Scripts must be writed in JavaScript. Of course we can write our scripts in the browser, but the browser script editor only support _most_ of ES5 features. We are in 2019 and we need to the ES6 features!

Afortunatelly, google had created [Clasp »](https://developers.google.com/apps-script/guides/clasp). It is an open-source tool, separate from the Apps Script platform, that lets you develop and manage Apps Script projects from your terminal rather than the Apps Script editor.

- in the root folder create a new folder `mkdir clasp`
- then go to this folder `cd clasp`
- ok, open your terminal and install Clasp with `npm install @google/clasp -g`
- login to the Clasp CLI `clasp login`
- don't create a new script, we need to clone an existing project script. Open the Apps Script project (browser) created in the previous section and go to `File > Project properties` then copy the `Apps Script ID`
- back to the terminal we need to clone the project `clasp clone <scriptId>`
- For ES6 features, we need to write our scripts with Typescript. Then change the extension of your scripts files from `*.js` to `*.ts`

> We will deploy our scripts with Clasp CLI later.

# Get Google Sheet data and push it to Firebase Database

- Go to `clasp/` folder and rename our new `<script>.ts` file to `index.ts`
- Edit this and paste the following code

```typescript
function writeDataToFirebase() {
  const firebaseUrl = "<firebase_url>";
  const secret = "<firebase_secret_id>";
  const base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);

  const spreadsheetId = "<google_sheet_id>";
  const rangeName = "<tab_name>";
  const data = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;

  if (!data) {
    Logger.log("No data found.");
  } else {
    Logger.log(data.parseData());
    base.setData("consoles", data.parseData());
  }
}

Array.prototype.parseData = function() {
  const [keys, ...rows] = this;
  return rows
    .filter(row => row.length)
    .map((row, i) => {
      let obj = {};
      row.forEach((item, i) => {
        obj = { ...obj, [keys[i]]: item };
      });
      return obj;
    });
};
```

- Replace `<firebase_url>`, `<firebase_secret_id>`, `<google_sheet_id>`, `<tab_name>` with the corrects.
- Now we need to push our Typescript Clasp script to Apps Script platform (browser) then type `clasp push` (you can use `clasp push --watch` to push each time you save the file)
- Be careful, don't commit/push the `<firebase_secret_id>`
- Go to our Apps Script project in the browser and see the pre-compiled code from Typescript to JavaScript
- Run the script. It will fail, because we don't import FirebaseApp and Sheets API libraries.

## Add Sheets API

[More info: Google Sheets API v4 »](https://developers.google.com/sheets/api/quickstart/apps-script)

- In the Apps Script editor, click `Resources > Advanced Google Services`.
- Locate Google Sheets API in the dialog and click the corresponding toggle, setting it to on.
- Click the `Google API` Console link.
- Enter `"Google Sheets API"` into the search box and click on the corresponding entry in the results.
- Click the `Enable API` button.
- Return to the Apps Script editor and click the OK button on the Advanced Google Services dialog.

## Add FirebaseApp API

[More info: Connect Firebase to Google services »](https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase)

- In the script editor, click on `Resources > Libraries`
- A popup box opens. Insert the following project key `MYeP8ZEEt1ylVDxS7uyg9plDOcoke7-2l` y the texbox and add the library ([more info »](https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase))
- Click on the box listing the different versions of the library. Select the latest public release
- Click save. You can now use FirebaseApp.
- Run the script again

> Google needs permissions. It is OK.

At this point, you should have been able to push the Google Sheet data to Firebase Realtime Database.

# "Observe" the database from Angular

- Create a new component `ng g c consoles`
- Display `<app-consoles>` on `app.component.html`
- Serve the app with `npm start` of `ng s`
- Install [angularfire2 »](https://github.com/angular/angularfire2) with `npm install firebase @angular/fire --save`
- Implement the following code

## consoles.component.ts

> Import `angularfire2` and `rxjs` into consoles.component.ts

```typescript
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
```

> Inject `AngularFireDatabase` service into constructor component and implement it

```typescript
export class ConsolesComponent {
  consoles: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.consoles = db.list("consoles").valueChanges();
  }
}
```

## consoles.component.html

> Implement the template with the async pipe

```html
<h1>Consoles:</h1>
<ol>
  <li *ngFor="let console of (consoles | async)">
    <ul>
      <li>Console: {{ console.console }}</li>
      <li>Price: {{ console.price }}</li>
    </ul>
    <br />
  </li>
</ol>
```

## app.module.ts

> Import Firebase module and service. Import environment variables too

```typescript
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";
import { environment } from "../environments/environment"; // environment variables
```

> Set AngularFireDatabase as a provider

```typescript
providers: [AngularFireDatabase],
```

> Set AngularFireDatabase as a provider

```typescript
imports: [..., AngularFireModule.initializeApp(environment.firebase)],
```

- As you can see `environment.firebase` is not defined, you need to edit the file `environment.ts` and `environment.prod.ts` in `./src/environments`
- Go to [Firebase Console](https://console.firebase.google.com) > Settings > Project Config. and in the `Your apps` section click on the `</>` icon, then copy the config object `{...}`
- Paste it as a second property of `environment` object in both files

```typescript
export const environment = {
  production: false,
  firebase: {...} // your content here
};
```
