function getRandInt(arr) {
    var z = arr[Math.floor(Math.random() * arr.length)];
    return z;
}

module.exports = class Gishatich {
    constructor(x, y, index, matrix) {
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        this.energy = 150;
        this.index = index;
        this.multiply = 5;
        this.gender = Math.round(Math.random());  // 0 - male, 1 - female
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(matrix, character1, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    move(matrix, GishatichArr, GishatichLiveArr) {
        var emptyCells = this.chooseCell(matrix, 0, 1);
        var newCells = getRandInt(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            if (matrix[y][x] == 0) {
                matrix[this.y][this.x] = 0;
            }
            else if (matrix[y][x] == 1) {
                matrix[this.y][this.x] = 1;
            }

            matrix[y][x] = 3;

            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy == 0) {
                this.die(matrix, GishatichArr, GishatichLiveArr);
            }

        }
    }
    eat(matrix, GrassEaterArr, GishatichArr, GishatichLiveArr, GrassEaterLiveArr) {
        var emptyCells = this.chooseCell(matrix,2);
        var newCells = getRandInt(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in GrassEaterArr) {
                if (x == GrassEaterArr[i].x && y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    GrassEaterLiveArr[0]++;
                }
            }
            //if (this.multiply == 5) {
                this.searchMate(matrix, GishatichArr);
                GishatichLiveArr[0]++;
               // this.multiply = 3;
           // }
        }
        else {
            this.move(matrix, GishatichArr, GishatichLiveArr);

        }
    }
    mul(matrix, GishatichArr) {
        var emptyCells = this.chooseCell(matrix, 0);
        var newCells = getRandInt(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            matrix[y][x] = this.index;
            var Gish = new Gishatich(x, y, 1);
            GishatichArr.push(Gish);
          
        }
    }
    searchMate(matrix, GishatichArr)
    {
        var otherGrassCells = this.chooseCell(matrix,3);

        for(var i in otherGrassCells)
        {
            var x = otherGrassCells[i].x;
            var y = otherGrassCells[i].y;

            for(var j in GishatichArr)
            {
                if(GishatichArr[j].x == x && GishatichArr[j].y == y && this.gender != GishatichArr[j].gender )
                {
                    this.mul(matrix, GishatichArr);
                    return;
                }
            }
        }
    }
    die(matrix, GishatichArr, GishatichLiveArr) {
        for (var i in GishatichArr) {
            if (this.x == GishatichArr[i].x && this.y == GishatichArr[i].y) {
                GishatichArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 0;
        GishatichLiveArr[1]++;
    }
}