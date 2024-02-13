const express = require('express');
const dbConnection = require('./db/connection');
const bodyParser = require('body-parser');
const app = express();

const port = 9000;
app.listen(port, () => {
  console.log(`Serving in the port ${port}`)
});

dbConnection();
if (dbConnection()){
  console.log("connected to the db");
} else {
  console.log("not connected to the db");
}

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })
  .use('/', require('./routes'));
