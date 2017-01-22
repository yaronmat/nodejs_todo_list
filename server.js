var http = require('http');
var express =require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var ejs = require('ejs');
var app = express();

app.use(session({secret: 'todotopsecret'}))

.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

.get('/todo', function(req, res) {
   res.render('todo.ejs', {todolist: req.session.todolist});
})

.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

.use(function(req, res, next){
    res.redirect('/todo');
});

app.listen(8001)
