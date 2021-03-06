//bring in express server and create application
const express = require('express');
const app = express();
//create server port
const PORT = process.env.PORT || 3030;
const path = require('path');

// //static files
app.use(express.static(path.join(__dirname, 'build')));

//configure middleware to support JSON data parsing from client requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configure router so routes are prefixed with /api
app.use('/api', require('./api'));

//if the environment is production, make sure you send
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

//setting up the a ping service so my app will stay active on heroku
app.get('/hello', (req, res) => {
  return res.send('Hello');
});

//configure error handling middleware last
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(err.message || 'Internal server error.');
});

//create server to listen on port 5000
app.listen(PORT, function () {
  console.log(`Node server is running on port ${PORT}`);
});
