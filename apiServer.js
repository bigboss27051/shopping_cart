var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIS

var mongoose = require('mongoose');
//Mongo LAB
mongoose.connect('mongodb://testUser:1234@ds151433.mlab.com:51433/bookshop')

//Local database
// mongoose.connect('mongodb://localhost:27017/bookshop',function(err, db) {
//   if(!err) {
//     console.log("We are connected");
//   }
// });

var db = mongoose.connection;
db.on('error',console.error.bind(console,'# MongoDB - connection error :'));
// SET UP SESSION
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))

//SAVE TO SESSION
app.post('/cart', (req,res) => {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if (err) {
      throw err;
    }
    res.json(req.session.cart);
  })
});

// GET SESSION
app.get('/cart', (req,res) => {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

// END SESSION SET UP

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
        throw console.log('# API DELETE BOOK: ',err);
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

// GET BOOKS A IMAGES API
app.get('/images', function(req,res){
  const imFolder = __dirname + '/public/images/';
  const fs = require('fs');

  fs.readdir(imFolder, (err,files) => {
    if (err) {
      return console.log(err);
    }

    const filesArr = [];
    files.forEach((file) => {
      filesArr.push({name:file});
    });
    res.json(filesArr);
  })
})


//END APIs


app.listen(3001, function(err){
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
