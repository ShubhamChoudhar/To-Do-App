// backend/controllers/taskController.js
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

const getTasks = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Decode token to get user information
  try {
    const tasks = await Task.find({ user: decoded.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  } 
};

const addTask = async (req, res) => {
  const { title, description } = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Decode token to get user information

  if (!title) {
    return res.status(400).send('Title is required');
  }
  try {
    const task = new Task({ title, description, user: decoded.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Decode token to get user information
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: decoded.userId },
      { title, description },
      { new: true }
    );
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Decode token to get user information
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: decoded.userId });
    if (!task) return res.status(404).send('Task not found');
    res.send('Task deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };