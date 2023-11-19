const express = require('express');
const { getToDo, addToDo, editToDo, deleteToDo, searchToDo } = require('../modules/todo.Controller');
const router = express.Router();

router.get('/',getToDo);
router.get('/search', searchToDo);
router.post('/', addToDo);
router.put('/', editToDo);
router.delete('/', deleteToDo);


module.exports=router;