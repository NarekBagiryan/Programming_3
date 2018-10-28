var side = 5;
var socket;
var matrix;
var stat;
var margin = 50;
function setup() {
  
    frameRate(0);
    socket = io.connect();
    socket.on('matrix', function (mtx) {
        matrix = mtx;
        createCanvas(matrix[0].length * side + 600, matrix.length * side);
        noLoop();

        socket.on('redraw', function (mtx) {
            matrix = mtx;
            redraw();
        });
        socket.on('Text', function (Stat) {
                  stat = Stat;
            });
    });


    background('#acacac');

}

function draw() {
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }

    for(var i in stat){
        fill(0, 0, 0);
        textSize(20);
        text(i + ":"+ stat[i], 520, margin)
        margin+=40;
    }
    margin = 40;
}
