const todoModel = require('../models/todo.model');
const httpStatus = require('http-status');

exports.getToDo = async (req, res) => {
  try {
    const todo = await todoModel.find();
    if (todo.length === 0) {
      return res.status(httpStatus.OK).json({
        message: "No Todo List",
      });
    }
    return res.send(todo);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};

exports.searchToDo = async (req, res) => {
  try {
    const searchText = req.query.text;
    const searchResults = await todoModel.find({ text: { $regex: new RegExp(searchText, 'i') } });
    if (!searchResults || searchResults.length === 0) {
      return res.status(httpStatus.OK).json({
        message: 'No matching todos found in the list.',
      });
    }
    return res.status(httpStatus.OK).json({
      data: searchResults,
      message: "Search Results:",
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};

exports.addToDo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Text is required.',
      });
    } else {
      const newTodo = await todoModel.create({ text });
      return res.send(newTodo);
    }
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({

      error: error.message
    });
  }
};

exports.editToDo = async (req, res) => {
  try {
    const { _id, text } = req.body;
    const idExist = await todoModel.findById(_id);
    if (!idExist) {
      return res.status(httpStatus.NOT_FOUND).json({
       
        message: 'Id not found.',
     
      });
    } else {
      const updatedTodo = await todoModel.findByIdAndUpdate(_id, { text });
      return res.send(updatedTodo);
    }
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: null,
      message: null,
      error: error.message
    });
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const { _id } = req.body;
    const idExist = await todoModel.findById(_id);
    if (!idExist) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Id not found.',
      });
    } else {
      await todoModel.findByIdAndDelete(_id);
     return res.send('Deleted Successfully.')
    }
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};
