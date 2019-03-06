# [Sched-Aroo](http://sched-aroo.herokuapp.com/)

## Description
To help solve the annoyance of needing to create a schedule manually every few months, why not build an app??
Specific pain points include: 
- same people volunteering leading to burnout
- unavailable date constraints
- volunteers serving in specific fields constraints.

## Tech Stack
- Postgres
- Node.js
- Express
- React
- Redux
- Sequelize
- Materialize
- Passport for Auth


## Database Schema
Schema diagram can be found at repo root level as png file or [click here](https://github.com/jamesmart77/scheduling_app/blob/master/Scheduling_app.png)


## Initial Setup
 - Add a `.env` file with the tokenSecret value of your choosing. This is needed for the signing of the JWT
 - Run `createdb scheduler-dev` in the terminal. You must have Postgres installed to perform this. This will create the local database
 - Modify the ORM/config file accordingly with your credentials to connect to your local db
 - Run `sequelize db:migrate` in the terminal before launching the application. This will perform all the migrations to setup the database
 - `Yarn` && cd/client `Yarn` - node module installs for server and client dependencies
 - `Yarn dev` to launch the app locally

## Other Notes
- Shout out to jmuturi for posting a tutorial on wiring up Node, Postgres, and Express with a Sequelize ORM. [Checkout the tutorial](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize). For any questions referring to the setup of Sequelize, refer to the article.
- [Trello board](https://trello.com/b/g8gfhwPm/scheduler)
- [Many-to-Many guide for Sequelize](https://medium.com/@THEozmic/how-to-create-many-to-many-relationship-using-sequelize-orm-postgres-on-express-677753a3edb5)
