var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    
    date = require('simple-format-date'),
    mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/quoting');
mongoose.Promise = global.Promise;
var QuoteSchema = new mongoose.Schema({
        name: String,
        quote: String
    }, {timestamps: true }
);
mongoose.model('Quote', QuoteSchema); 
var Quote = mongoose.model('Quote');

app.get('/', function(req, res) {
    res.render("index");
})
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err) {
        if(err) {
            console.log("something went wrong");
            res.render("index", {errors: Quote.errors});
        }
        else {
            console.log("success!");
            res.redirect("/quotes");
        }
    })    
})
app.get('/quotes', function(req, res) {
    console.log("bad");
    Quote.find({}).sort({ createdAt: 'desc' }).exec(function(err, quotes) {
        if(err) {
            console.log("bad news");
            res.render("quotes", {errors: Quote.errors});
        }
        else {
            res.render("quotes", {quotes: quotes});
        } 
    })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
