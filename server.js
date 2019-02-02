const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./ORM/models');
const routes = require("./routes");
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve up static assets
app.use(express.static("client/build"));

app.use(cookieParser());

// Add routes, both API and view
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  
  db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("App listening on PORT " + port);
    });
  });

} else {
  db.sequelize.sync({
    //   force: true
  }).then(() => {
      app.listen(port, () => {
          console.log("App listening on PORT " + port);
      });
  });
};