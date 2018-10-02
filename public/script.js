function randomMatrix(m, n) {
    var matrix = [];
    for (var y = 0; y < m; y++) {
        matrix[y] = []

        for (var x = 0; x < n; x++) {
            matrix[y][x] =  Math.round(Math.random());
        }
    }
    matrix[35][2]=2;
    matrix[40][60]=2;
    matrix[18][51]=2;
    matrix[40][40]=2;
    matrix[15][48]=2;
    matrix[58][96]=2;

    matrix[74][74]=3;
    matrix[65][21]=3;
    matrix[58][74]=3;
    matrix[24][35]=3;
    matrix[68][86]=3;
    matrix[25][96]=3;
    matrix[34][36]=3;
    matrix[15][38]=3;
    matrix[58][65]=3;
    matrix[55][95]=3;
    matrix[62][97]=3;
    matrix[21][68]=3;

    matrix[80][80]=4;
    matrix[68][24]=4;
    matrix[63][80]=4;
    matrix[30][40]=4;
    matrix[73][90]=4;
    matrix[30][97]=4;
    matrix[38][40]=4;
    matrix[20][43]=4;
    matrix[63][66]=4;
    matrix[60][96]=4;
    matrix[65][98]=4;
    matrix[22][69]=4;

    matrix[66][60]=5;
    matrix[23][73]=5;
    matrix[80][84]=5;
    matrix[68][28]=5;
    matrix[63][82]=5;
    matrix[30][38]=5;
    matrix[73][94]=5;
    matrix[30][86]=5;
    matrix[38][35]=5;
    matrix[20][40]=5;
    matrix[63][64]=5;
    matrix[60][90]=5;
    matrix[65][80]=5;
    matrix[22][72]=5;
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
         GrassEaterArr[i].eat();       
     }
     for (var i in GishatichArr) {
         GishatichArr[i].eat();       
     }
      for (var i in GishatichakerArr) {
          GishatichakerArr[i].eat();       
      }
       for (var i in GishatichEaterArr) {
          GishatichEaterArr[i].eat();       
      }
}
