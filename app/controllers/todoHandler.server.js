'use strict';

var ObjectId = require("mongodb").ObjectId;

function todoHandler(db) {

   this.addTodo = function(req, res) {
        db.collection('todo').insert({
            title: req.body.title,
            message: req.body.message
        }, function(err) {
            if (err) {
                throw err;
            }
            res.send(req.body);
        });
    };

    this.getTodos = function(req, res) {
        
        var cursor = db.collection('todo').find().sort({ _id: -1 });
        
        var list = [];

        //if doc isn't null pust to list
        //if it is send list
        cursor.each(function(err, doc) {
            if (err) throw err;
            if (doc === null) {
                res.send(list);
            }
            list.push(doc);
        });
    };
    
    this.removeTodo = function(req, res) {
        db.collection('todo').deleteOne({
            "_id": ObjectId(req.body.id)
            }, function(err) {
            if (err) {
                throw err;
            }
            res.send(req.body);
        });
    };
    
    
    this.editTodo = function(req, res) {
        db.collection('todo').update({
            "_id": ObjectId(req.body.id)
            }, {
                title: req.body.title,
                message: req.body.message
            },function(err) {
            if (err) {
                throw err;
            }
            res.send(req.body);
        });
    };

}

module.exports = todoHandler;