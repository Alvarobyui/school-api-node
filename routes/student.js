const express = require('express');

const controller = require('../controllers/student');

const router = express.Router();

const connect_db = require('../db/connection');
const mongoose = require('mongoose');
/* const studentsController = require("../controllers/student"); */

/* router.get("/students", studentsController.test); */

router.get(
  "/students",
  controller.getData
)

module.exports = router;