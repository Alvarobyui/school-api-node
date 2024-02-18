const express = require('express');
const dbConnection = require('./db/connection');
const bodyParser = require('body-parser');
const app = express();
const studentRouters = require('./routes/student');
const teacherRouters = require('./routes/teacher');
const port = 8080 || process.env.PORT;


app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON

/* initialize(); */
app
.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})
.use(bodyParser.urlencoded({
  extended: true
}))
.use("7", require("./routes/student"));

app.use(studentRouters)
app.use(teacherRouters)

dbConnection.initDb((err) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`)
    });
    }
});
