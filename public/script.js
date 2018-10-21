function randomMatrix(m, n) {
    var matrix = [];
    for (var y = 0; y < m; y++) {
        matrix[y] = []

        for (var x = 0; x < n; x++) {
            matrix[y][x] =  Math.round(Math.random());
        }
    }
    matrix[35][2]=2;
    matrix[37][2]=2;
    matrix[32][2]=2;
    matrix[33][2]=2;
    matrix[31][2]=2;
    matrix[30][2]=2;
    matrix[29][2]=2;
    matrix[38][2]=2;
    matrix[39][2]=2;
    matrix[40][2]=2;
    matrix[42][2]=2;
    matrix[44][2]=2;
    matrix[45][2]=2;
    matrix[46][2]=2;
    matrix[47][2]=2;
    matrix[48][2]=2;
    matrix[49][2]=2;
    matrix[46][80]=2;
    matrix[50][80]=2;
    matrix[51][80]=2;
    matrix[52][80]=2;
    matrix[53][80]=2;
    matrix[54][80]=2;
    matrix[55][80]=2;
    matrix[56][80]=2;
    matrix[57][80]=2;
    matrix[58][80]=2;
    matrix[59][80]=2;
    matrix[60][80]=2;

    matrix[74][50]=3;
    matrix[73][50]=3;
    matrix[72][50]=3;
    matrix[71][50]=3;
    matrix[70][50]=3;
    matrix[69][50]=3;
    matrix[68][50]=3;
    matrix[67][50]=3;
    matrix[34][36]=3;
    matrix[35][36]=3;
    matrix[36][36]=3;
    matrix[37][36]=3;
    matrix[38][36]=3;
    matrix[39][36]=3;

    matrix[80][75]=4;
    matrix[79][75]=4;
    matrix[78][75]=4;
    matrix[77][75]=4;
    matrix[76][75]=4;
    matrix[75][75]=4;
    matrix[74][75]=4;
    matrix[73][75]=4;
    matrix[38][40]=4;
    matrix[40][40]=4;
    matrix[41][40]=4;
    matrix[42][40]=4;
    matrix[43][40]=4;
    matrix[44][40]=4;

    matrix[66][65]=5;
    matrix[65][65]=5;
    matrix[64][65]=5;
    matrix[63][65]=5;
    matrix[62][65]=5;
    matrix[61][65]=5;
    matrix[60][65]=5;
    matrix[59][65]=5;
    matrix[38][95]=5;
    matrix[39][95]=5;
    matrix[40][95]=5;
    matrix[41][95]=5;
    matrix[42][95]=5;
    matrix[43][95]=5;
    return matrix;

}

var grassArr = [];
var GrassEaterArr = [];
var GishatichArr = [];
var GishatichakerArr = [];
var GishatichEaterArr = [];
var matrix = randomMatrix(100, 100);

var side = 10;

function setup() {
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side, );
    background("#acacac");


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
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
             else if(matrix[y][x] == 2){
                fill("yellow");
                rect(x * side, y * side, side, side);
             }
             else if(matrix[y][x] == 3){
                fill("black");
                rect(x * side, y * side, side, side);
             }
             else if(matrix[y][x] == 4){
                fill("red");
                rect(x * side, y * side, side, side);
             }
              else if(matrix[y][x] == 5){
                fill("blue");
                rect(x * side, y * side, side, side);
             }
            else {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }


        }

    }

     for (var i in grassArr) {
        grassArr[i].mul();
    }
     for (var i in GrassEaterArr) {
         GrassEaterArr[i].eat(1);       
     }
     for (var i in GishatichArr) {
         GishatichArr[i].eat(2);       
     }
      for (var i in GishatichakerArr) {
          GishatichakerArr[i].eat();       
      }
       for (var i in GishatichEaterArr) {
          GishatichEaterArr[i].eat();       
      }
}
