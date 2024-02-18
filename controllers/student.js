const mongodb = require('../db/connection');
const Student = require('../models/student');
const ObjectId = require('mongodb').ObjectId;

const getStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('students').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }
    const result = await mongodb.getDb().db().collection('students').findOne({ _id: new ObjectId(id) });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, lastName, email, phone, course } = req.body;
    if (!name || !lastName || !email || !phone || !course) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const student = new Student({ name, lastName, email, phone, course });
    const response = await mongodb.getDb().db().collection('students').insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error while creating the student');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const { name, lastName, email, phone, course } = req.body;
    if (!name || !lastName || !email || !phone || !course) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingStudent = await mongodb
      .getDb()
      .db()
      .collection('students')
      .findOne({ _id: new ObjectId(userId) });

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update existing student object with new values
    existingStudent.name = name;
    existingStudent.lastName = lastName;
    existingStudent.email = email;
    existingStudent.phone = phone;
    existingStudent.course = course;

    const response = await mongodb
      .getDb()
      .db()
      .collection('students')
      .replaceOne({ _id: new ObjectId(userId) }, existingStudent);

    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }
    const response = await mongodb.getDb().db().collection('students').deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};