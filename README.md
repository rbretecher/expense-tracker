# Expense Tracker

Expense Tracker is an application that allows you to keep track of shared expenses to easily split bills with friends and family.

It is mostly an experiment for my personal use and also to discover new tools/frameworks. Frontend is built thanks to the awesome [Quasar framework](https://github.com/quasarframework/quasar) and backend is powered by Go backed with a PostgreSQL database.

If you want to give it a try, you can install it for free (see section below) or you can just use the [online demo](https://demo-expense-tracker.herokuapp.com) hosted on Heroku.

Demo credentials are :

- Email : admin@demo.com
- Password : azerty

## How to use

### Deploy on Heroku

Create a free account on Heroku and deploy a free instance of this application just by hitting the Deploy to Heroku button.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Start locally

You must have Docker and Docker Compose installed.

Clone the repository and execute :

```bash
make start
```

The project will be available at : http://localhost:8080
