const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./ORM/models');

const app = express();
const port = process.env.PORT || 5000;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'This will be the fanstical scheduling app in the coming weeks!!' });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
  
  db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("App listening on PORT " + port);
    });
  });

} else {
  db.sequelize.sync({
      force: true
  }).then(() => {
      app.listen(port, () => {
          console.log("App listening on PORT " + port);
      });
  });
};