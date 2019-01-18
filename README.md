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

# PROCESS

- create a new Angular project `ng new <project>`
- go to your project folder `cd <project>`
- create a new project in [Firebase Console »](https://console.firebase.google.com/)
- install [Firebase CLI »](https://firebase.google.com/docs/cli)
- login into firebase `firebase login` (complete the auth process)
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
