'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

var TodoHandler = require(process.cwd() + '/app/controllers/todoHandler.server.js');

module.exports = function (app, db) {
   var clickHandler = new ClickHandler(db);
   
   var todoHandler = new TodoHandler(db);

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

   app.route('/api/clicks')
      .get(clickHandler.getClicks)
      .post(clickHandler.addClick)
      .delete(clickHandler.resetClicks);
      
   app.route('/api/todo')
      .get(todoHandler.getTodos)
      .post(todoHandler.addTodo)
      .put(todoHandler.editTodo)
      .delete(todoHandler.removeTodo);
};

