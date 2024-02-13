const connect_db = require('../db/connection');
const mongoose = require('mongoose');


app.get("/students", (req, res) => {
  StudentModel.find({}).then(function(students) {
    res.json(students)
  }).catch(function(err) {
    console.log(err)
  })
})

