const mongoose = require('mongoose');
const connect_db = require('../db/connection');
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: Number,
  course: String
})

module.exports = mongoose.model("student", StudentSchema)
