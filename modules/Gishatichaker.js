function getRandInt(arr) {
    var z = arr[Math.floor(Math.random() * arr.length)];
    return z;
}

module.exports = class Gishatichaker {
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1]
        ]
    }
    chooseCell(matrix, character1,character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2)
                 {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    move(matrix, GishatichakerArr) {
        var emptyCells = this.chooseCell(matrix,0, 1);
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

            matrix[y][x] = 4;

            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy == 0) {
                this.die(matrix, GishatichakerArr);
            }

        }
    }
    eat(matrix, GishatichakerArr, GrassEaterArr, GishatichArr) {
        var emptyCells = this.chooseCell(matrix,3);
        var newCells = getRandInt(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in GishatichArr) {
                if (x == GishatichArr[i].x && y == GishatichArr[i].y) {
                    GishatichArr.splice(i, 1);
                }
            }
             for (var i in GrassEaterArr) {
                if (x == GrassEaterArr[i].x && y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                }
             }
            if (this.multiply == 5) {
                this.searchMate(matrix, GishatichakerArr);
                this.multiply = 3;
            }
        }
        else {
            this.move(matrix, GishatichakerArr);

        }
    }
    mul(matrix, GishatichakerArr) {
        var emptyCells = this.chooseCell(matrix,0);
        var newCells = getRandInt(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            matrix[y][x] = this.index;
            var Gishaker = new Gishatichaker(x, y, 1);
            GishatichakerArr.push(Gishaker);
        }
    }
    searchMate(matrix, GishatichakerArr)
    {
        var otherGrassCells = this.chooseCell(matrix,4);

        for(var i in otherGrassCells)
        {
            var x = otherGrassCells[i].x;
            var y = otherGrassCells[i].y;

            for(var j in GishatichakerArr)
            {
                if(GishatichakerArr[j].x == x && GishatichakerArr[j].y == y && this.gender != GishatichakerArr[j].gender )
                {
                    this.mul(matrix, GishatichakerArr);
                    return;
                }
            }
        }
    }
    die(matrix, GishatichakerArr) {
        for (var i in GishatichakerArr) {
            if (this.x == GishatichakerArr[i].x && this.y == GishatichakerArr[i].y) {
                GishatichakerArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 0;
    }
}