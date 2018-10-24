var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var grassArr = [];
var GrassEaterArr = [];
var GishatichArr = [];
var GishatichakerArr = [];
var GishatichEaterArr = [];

var matrix = require('./modules/matrix');
var grass = require('./modules/class.grass');
var grasseater = require('./modules/class.eatgrass');
var gishatich = require('./modules/Gishatich');
var gishatichaker = require('./modules/Gishatichaker');
var gishaticheater = require('./modules/GishatichEater');

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect('public/index.html');
});

server.listen(3000);

var frameCount = 5;

var drawTime = 1000/frameCount;

io.on('connection', function(socket){
  socket.emit( 'matrix',  matrix);
  
  var inter = setInterval( function(){
    socket.emit('redraw', matrix);
  }, drawTime);
});
