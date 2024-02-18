const express = require('express');

const controller = require('../controllers/teachers');

const router = express.Router();

const connect_db = require('../db/connection');
const mongoose = require('mongoose');

router.get(
  "/teachers",
  controller.getData
)

module.exports = router;