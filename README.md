[![Deploy to Firebase](https://github.com/rbretecher/expense-tracker/workflows/Deploy%20to%20Firebase/badge.svg?branch=master)](https://github.com/rbretecher/expense-tracker/actions?query=workflow%3A%22Deploy+to+Firebase%22+branch%3Amaster)

# Expense Tracker

Expense Tracker is an application that allows you to keep track of shared expenses to easily split bills with friends and family.

It is mostly an experiment for my personal use and also to discover new tools/frameworks. Frontend is built thanks to the awesome [Quasar framework](https://github.com/quasarframework/quasar) and uses [Firebase Realtime Database](https://firebase.google.com/docs/database) for the storage with [Cloud Functions for Firebase](https://firebase.google.com/docs/functions) for the backend part.

If you want to give it a try, you can install it for free (see section below) or you can just use the [online demo](https://expense-tracker-demo-42250.firebaseapp.com) hosted on Firebase Hosting.

## How to use

You can easily deploy this application to Firebase or run it locally, you just need :
- A Google account to create a Firebase project (free)
- `npm` to install Firebase CLI
- `docker` and `docker-compose` to build and/or deploy the project

### Requirements

#### Install firebase-tools

```bash
$ npm install -g firebase-tools
```

#### Create a Firebase project

Sign in on the [Firebase Console](https://console.firebase.google.com) with your Google Account and create a new Firebase project. Add a web application to this Firebase project.

Rename the `.env.example` file by removing the `.example` extension :
```bash
$ mv .env.example .env
```

Update the `.env` file with your Firebase project settings.

### How to run locally

```bash
$ make docker-dev
```

You should be able to access the application through this URL : http://localhost:8080/

### How to deploy to Firebase

Run this command to get the `FIREBASE_TOKEN` needed to deploy :
```bash
$ firebase-tools login
```

Update the `.env` file with your `FIREBASE_TOKEN`.

Then run this command to build and deploy the project to Firebase :
```bash
$ make docker-deploy
```

Ta-da! Your project is now deployed and available on Firebase.

## Next steps

About the project :
- Code cleaning/refactoring
- UI/UX improvements

New features :
- Add authentication (Firebase Authentication)
    - For now, everyone can access the Firebase Realtime Database (read/write)
- Improve mobile support
- Set parts to split expenses unevenly
