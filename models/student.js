const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: String,
  course: String
})

module.exports = mongoose.model("student", StudentSchema)
