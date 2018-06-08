var express = require("express");
console.log("Let's find out what express is", express);

var app = express();
console.log("Let's find out what app is",app);

var arr = [
    	{ name: 'Cameron', email: 'cmbloom90@gmail.com' },
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

app.get("/users", function (request, response){
    

    response.render('users', {users: arr});
});


var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.post('/users', function (req,res){	
	console.log("POST DATA \n\n", req.body)
	arr[arr.length]=req.body
	console.log(arr);
	res.redirect('/users');
});


app.listen(8000, function(){
	console.log("Listening on port 8000");
})