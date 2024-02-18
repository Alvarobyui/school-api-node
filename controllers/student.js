const mongodb = require('../db/connection')
const Student = require('../models/student')
const ObjectId = require('mongodb').ObjectId;

const getStudents = async (req, res) => {
  const result = await mongodb.getDb().db().collection('students').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getStudentById = async (req, res) => {
  const id = new ObjectId(req.params.id);
  console.log(typeof(id));

  try {
    const result = await mongodb.getDb().db().collection('students').findOne({ _id: id });
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
  const student = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    course: req.body.course
  };
  const response = await mongodb.getDb().db().collection('students').insertOne(student);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error while creating the student');
  }
  /* const { name, lastName, email, phone, course } = req.body;
  try {
    console.log("antes de crear instancia de student")
    const student = new Student({ name, lastName, email, phone, course });
    console.log("despues de crear instancia de student")
    await student.save();
    console.log("despues de guardar en DB")
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } */
};

const updateStudent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const student = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    course: req.body.course
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('students')
    .replaceOne({ _id: userId }, student);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || 'Error while updating the student');
  }
  /* const id = new ObjectId(req.params.id);
  const { name, lastName, email, phone, course } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, { name, lastName, email, phone, course }, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } */
};

const deleteStudent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('students').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error while deleting the student.');
  }

  /* const id = req.params.id;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } */
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};