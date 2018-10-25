function getRandInt() {
    var z = Math.floor(Math.random());
    return z;
}

module.exports = class GrassEater {
    constructor(x, y, index, matrix) {
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        this.energy = 80;
        this.index = index;
        //this.multiply = 0;
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
        ];
    }

    chooseCell(character, matrix) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    move(matrix) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCells = getRandInt(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 1) {
                this.die();
            }

        }
    }
    eat(matrix) {
        var emptyCells = this.chooseCell(1, matrix);
        var newCells = getRandInt(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            //if (this.multiply == 5 ) {
                this.searchMate();
                //this.multiply = 0;
            //}


        }
        else {
            this.move(matrix);

        }
    }
    mul(matrix) {
        var emptyCells = this.chooseCell(0, matrix);
        var newCells = getRandInt(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            matrix[y][x] = this.index;
            var newGrasseater = new GrassEater(newCells[0], newCells[1], this.index);
            GrassEaterArr.push(newGrasseater);
        }
    }

    searchMate()
    {
        var otherGrassCells = this.chooseCell(2);

        for(var i in otherGrassCells)
        {
            var x = otherGrassCells[i].x;
            var y = otherGrassCells[i].y;

            for(var j in GrassEaterArr)
            {
                if(GrassEaterArr[j].x == x && GrassEaterArr[j].y == y && this.gender != GrassEaterArr[j].gender )
                {
                    this.mul(matrix);
                    return;
                }
            }
        }
    }
    die() {
        for (var i in GrassEaterArr) {
            if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                GrassEaterArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 0;
    }
}