var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIS

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop',function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

var Books = require('./models/books.js');

// POST BOOKS
app.post('/books',function(req,res){
  var book = req.body;
  Books.create(book,function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

// GET BOOKS
app.get('/books',(req,res)=>{
  Books.find((err,books)=>{
    if (err) {
      throw err;
    }
    res.json(books);
  })
});

// DELETE BOOKS
app.delete('/books/:_id',(req,res)=>{
  var query = {_id:req.params._id};
  Books.remove(query,(err,books)=>{
      if (err) {
        throw err;
      }
      res.json(books);
  })
});

//UPDATE BOOKS
app.put('/books/:_id',(req,res) => {
  var book = req.body;
  var query = req.params._id;

  var update = {
    '$set':{
      title:book.title,
      description:book.description,
      image:book.image,
      price:book.price
    }
  };

  var option = {new:true};

  Books.findOneAndUpdate(query,update,(err,books) => {
    if (err) {
      throw err;
    }
    res.json(books);

  })
})

//END APIs


app.listen(3001, function(err){
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
