const express      = require ('express');
const MongoClient  = require ('mongodb').MongoClient;
const bodyParser   = require ('body-parser');
const db           = require('./config/db');

var app= express();

app.use(express.static(__dirname+'/public'))

app.set('view engine','hbs');

app.get('/',(req, res)=>{
res.send('<h1>Hello Express!</h1>');
});


//const port = 8000;

var port = process.env.PORT || 8000;
app.use(function(req, res, next){
    res.header("Access-Control-Allow_Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json({ extended: true}))

MongoClient.connect(db.url, (err,database) => {
  if (err) return console.log(err)
  require("./app/routes")(app, database);
  app.listen(port,() => {
    console.log("Great! Server working on port : " + port);
  })
})
