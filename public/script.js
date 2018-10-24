var side = 10;
var socket;
var matrix;

function setup() 
{
    frameRate(0);
    socket = io.connect();

    socket.on('matrix', function(mtx){
        matrix = mtx;
        createCanvas(matrix[0].length * side, matrix.length * side);
        noLoop();

        socket.on('redraw', function(mtx){
            matrix = mtx;
            redraw();

        });
    });
   
    

    background("#acacac");
}

function draw() 
{
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
}
