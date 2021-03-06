//packages
var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8080;
var morgan       = require('morgan');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var router       = express.Router();
var appRoutes    = require('./app/routes/api')(router);
var path         = require('path');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

//database connection
mongoose.connect('mongodb://localhost:27017/tutorial', function(err){
    if(err){
        console.log('not connected to the database ' + err);
    }else{
        console.log('successfully connected to the MongoDB');
    }
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//server port
app.listen(port, function(){
    console.log('running the server on port ' + port);
});