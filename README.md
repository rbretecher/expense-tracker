# Expense Tracker

Expense Tracker is an application that allows you to keep track of shared expenses to easily split bills with friends and family.

It is mostly an experiment for my personal use and also to discover new tools/frameworks. Frontend is built thanks to the awesome [Quasar framework](https://github.com/quasarframework/quasar) and uses [Firebase Realtime Database](https://firebase.google.com/docs/database) for the storage with [Cloud Functions for Firebase](https://firebase.google.com/docs/functions) for the backend part.

If you want to give it a try, you can install it for free (see section below) or you can just use the [online demo](https://web-expense-tracker-demo.web.app) hosted on Firebase Hosting.

## How to install

### Requirements
You can install this application for free, you just need a Google account to create a Firebase project.

### Create a Firebase project

Sign in on the [Firebase Console](https://console.firebase.google.com) with your Google Account and create a new Firebase project.

### Install firebase-tools

You need to install `firebase-tools` with [npm](https://www.npmjs.com/) :
```bash
$ npm install -g firebase-tools
```

Then run this command to login :
```bash
$ firebase-tools login
```

### Build and deploy the project

Clone the `expense-tracker` project and build it :
```
$ npm run build
```

Then run this command so that firebase knows which project to deploy :
```bash
$ firebase use PROJECT_NAME
```

Finally, execute this command to deploy the project
```
$ firebase deploy
```

Ta-da! Your project is now deployed and available on Firebase.
