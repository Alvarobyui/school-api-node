const express = require('express');
const router = express.Router();

const connect_db = require('../db/connection');
const mongoose = require('mongoose');
/* const studentsController = require("../controllers/student"); */

/* router.get("/students", studentsController.test); */

router.get("/students", (req, res) => {
  /* StudentModel.find({}).then(function(students) {
    res.json(students)
  }).catch(function(err) {
    console.log(err)
  }) */
  res.json("helle");
})

module.exports = router;