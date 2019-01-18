> 😅 NOTE: I'm Spanish speaking and my English is pretty bad, I promise to correctly rewrite the documentation so everyone can understand it. I'm sorry.

# Google Realtime App

We need to do the following actions:

- Add values to a Google Sheet
- Push these values automaticaly to a Firebase Realtime Database
- Observe the database and show the data in the frontend every time the Google Sheet data changes.

> Google Sheets (CMS) > Google Apps Script (Service) > G Suite Hub (Autom.) >Firebase Database (DB) > Angular (Front)

# Setup front and firebase hosting project

- Open terminal and create a new Angular project `ng new <project>`
- Go to your project folder `cd <project>`
- Create a new project in [Firebase Console »](https://console.firebase.google.com/)
- Install [Firebase CLI »](https://firebase.google.com/docs/cli) with `npm install -g firebase-tools`
- In your terminal, login into firebase `firebase login` (complete the auth process)
- Init firebase project `firebase init`
- Select `(*) Hosting` (select with space then press enter)
- Select `[don't setup a default project]` (selected by default)
- Select `public` folder (selected by default)
- DON'T `configure as a single-page app` (selected by default)
- Edit `.firebaserc` and paste the following code

```
{
  "projects": {
    "default": "<your-project-id>"
  }
}
```

- Type `firebase list` and copy the project id of your project recently created then replace it in `.firebaserc`
- Edit `angular.json` file and replace `outputPath: dist/<project>` with `"outputPath": "public"`
- Edit `.gitignore` file and ignore the `/public` folder
- We need to build the frontend then type `npm run build`
- Make a deploy to firebase hosting with `firebase deploy`
- Open your app browser and go to https://your-project-id.firebaseapp.com/ then you can see the static frontend

> 💾 It is a good time for commit your changes.

# Firebase Database Realtime

- Go to [Firebase Console »](https://console.firebase.google.com/) > Database and create a new `Realtime Database` (press next on the pop up)
- In Database go to `Rules` tab and set read value to `true` then Publish the rules on the blue message

# Google Sheet

- Create a Google Sheet file in your Google Drive account
- Open it and add some title and save (maybe `<your-project>`)
- Then fill it with some data like this:

| **console**       | **price** |
| ----------------- | --------- |
| Playstation 4     | 299       |
| Playstation 4 Pro | 400       |
| Xbox One S        | 299       |
| Xbox One X        | 500       |
| Nintendo Switch   | 299       |
| Nintendo 2DS      | 140       |

- Then in the toolbar click on `Tools > Apps Script Editor` (it will open a new tab)
- Add some title and save, i recomend the same as google sheet title (maybe `<your-project>`)

> We need the Apps Script ID later to clone this project with [Clasp »](https://developers.google.com/apps-script/guides/clasp) and use ES6 features

# Apps Scripts with Clasp

The Apps Scripts must be writed in JavaScript. Of course we can write our scripts in the browser, but the browser script editor only support _most_ of ES5 features. We are in 2019 and we need to the ES6 features!

Afortunatelly, google had created [Clasp »](https://developers.google.com/apps-script/guides/clasp). It is an open-source tool, separate from the Apps Script platform, that lets you develop and manage Apps Script projects from your terminal rather than the Apps Script editor.

- In the root folder create a new folder `mkdir clasp`
- Then go to this folder `cd clasp`
- Ok, open your terminal and install Clasp with `npm install @google/clasp -g`
- Login to the Clasp CLI `clasp login`
- Don't create a new script, we need to clone an existing project script. Open the Apps Script project (browser) created in the previous section and go to `File > Project properties` then copy the `Apps Script ID`
- Back to the terminal we need to clone the project `clasp clone <scriptId>`
- For ES6 features, we need to write our scripts with Typescript. Then change the extension of your scripts files from `*.js` to `*.ts`

> We will deploy our scripts with Clasp CLI later.

> 💾 It is a good time for commit your changes.

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

> 💾 It is a good time for commit your changes.

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
    this.consoles = db.list("consoles").valueChanges(); // list("consoles") is the json property name in our database, same name as the column head of consoles in our Google Sheets
  }
}
```

[More info: angularfire2 > lists](https://github.com/angular/angularfire2/blob/master/docs/rtdb/lists.md)

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

[More info: Remember to set your Firebase configuration in app/app.module.ts](https://github.com/angular/angularfire2#quick-links)

- As you can see `environment.firebase` is not defined, you need to edit the file `environment.ts` and `environment.prod.ts` in `./src/environments`
- Go to [Firebase Console](https://console.firebase.google.com) > Settings > Project Config. and in the `Your apps` section click on the `</>` icon, then copy the config object `{...}`
- Paste it as a second property of `environment` object in both files

```typescript
export const environment = {
  production: false,
  firebase: {...} // your content here
};
```

- Ok we have to make a new build and push it to Firebase Hosting
- Build the frontend with `npm run build`
- Deploy with `firebase deploy`
- See the result in https://your-project-id.firebaseapp.com/

> 💾 It is a good time for commit your changes.

## Update database when edit the Google Sheet file

If we have to add new consoles to the app then go to the Google Sheet file and add a new console to the list. But we need to run the script again. Fortunately we have Project Activators in Google Apps Script editor that automates the process. Let's go there. Open the Apps Script editor of your Google Sheet

> Alternativley you can go to [G Suite Developer Hub »](https://script.google.com) and you can see the list of all your script projects

- Open the editor and click on the `Project Activators` button to the left of "Run" scritp

> Activate the Project Activator if it wasn't activated yet

- Add `New Activator` (bottom right button)
- Select `writeDataToFirebase` as the function to execute
- On "Event source" select `Google Sheet`
- On "Event type" select `Edit`
- Save and complete the auth.

Now, when you edit the Google Sheet file, the Apps Script runs and update the Firebase Realtime Database, then thanks to the RXJS Observables, we can "observe" the database changes and fetch those values whose will show in the front in real time, without reload the page.

---

💖 Thank you for reaching the end. I wish it had been helpful. Give the repository a star if you liked it. Keep learning!

[Lucas Romero Di Benedetto](https://lucasromerodb.github.io/)
