const connect_db = require('../db/connection');
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  phone: Number,
  course: String
})
const StudentModel = mongoose.model("students", StudentSchema)

app.get("/students", (req, res) => {
  StudentModel.find({}).then(function(students) {
    res.json(students)
  }).catch(function(err) {
    console.log(err)
  })
})

