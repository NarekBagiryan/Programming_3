var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var grassArr = [];
var GrassEaterArr = [];
var GishatichArr = [];
var GishatichakerArr = [];
var GishatichEaterArr = [];

var matrix = require('./modules/matrix');
var Grass = require('./modules/class.grass');
var GrassEater = require('./modules/class.eatgrass');
var Gishatich = require('./modules/Gishatich');
var Gishatichaker = require('./modules/Gishatichaker');
var GishatichEater = require('./modules/GishatichEater');

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect('public/index.html');
});

server.listen(3000);



for (var y = 0; y < matrix.length; ++y) {
  for (var x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 1) {
          var gr = new Grass(x, y, 1);
          grassArr.push(gr);
      }
      else if (matrix[y][x] == 2) {
          var eat = new GrassEater(x, y, 2);
          GrassEaterArr.push(eat);
      }
      else if (matrix[y][x] == 3) {
          var gish = new Gishatich(x, y, 3);
          GishatichArr.push(gish);
      }
      else if (matrix[y][x] == 4) {
          var gishaker = new Gishatichaker(x, y, 4);
          GishatichakerArr.push(gishaker);
      }
      else if (matrix[y][x] == 5) {
          var gisheater = new GishatichEater(x, y, 5);
          GishatichEaterArr.push(gisheater);
      }
      else if (matrix[y][x] == 8) {

      }
  }
}

var Stat = 
{
    "Season":"Winter",
    "Grass": grassArr.length,
    "GrassEater": GrassEaterArr.length,
    "Gishatich": GishatichArr.length,
    "Gishatichaker": GishatichakerArr.length,
    "GishatichEater": GishatichEaterArr.length
};

function main() {
    var JSO = JSON.stringify(Stat);
    fs.writeFileSync("obj.json", JSO);
 }
 main();


var frameRate = 5;
var frameCount = 0;

var drawTime = 1000 / frameRate;
var FC = 0;

io.on('connection', function (socket) {

  socket.emit('matrix', matrix);
  socket.emit("Text", Stat);

  var inter = setInterval(function () {
    FC++;
    frameCount++;

    if(FC % 15 == 0)
    {
      if(Stat['Season'] == "Winter"){
        Stat['Season'] = "Summer";
      }
      else Stat['Season'] = "Winter";
  
      socket.emit("Text", Stat);
    }
    for (var i in grassArr) {
      grassArr[i].mul(matrix, grassArr);
    }
    for (var i in GrassEaterArr) {
      GrassEaterArr[i].eat(matrix, grassArr, GrassEaterArr)
    }
    for (var i in GishatichArr) {
      GishatichArr[i].eat(matrix, GrassEaterArr, GishatichArr);
    }
    for (var i in GishatichakerArr) {
      GishatichakerArr[i].eat(matrix, GishatichakerArr, GrassEaterArr, GishatichArr);
    }
    for (var i in GishatichEaterArr) {
      GishatichEaterArr[i].eat(matrix, GishatichEaterArr, GishatichakerArr, GrassEaterArr, GishatichArr);
    }

    socket.emit('redraw', matrix);

    if(frameCount >= 60){
      Stat = 
        {
            "Season":"Winter",
            "Grass": grassArr.length,
            "GrassEater": GrassEaterArr.length,
            "Gishatich": GishatichArr.length,
            "Gishatichaker": GishatichakerArr.length,
            "GishatichEater": GishatichEaterArr.length
        };

      socket.emit("Text", Stat);

      frameCount = 0;
    }
  }, drawTime);
});
