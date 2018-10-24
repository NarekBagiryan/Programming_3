module.exports = class Gishatichaker {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 80;
        this.index = index;
        this.multiply = 2;
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
    chooseCell(character1, character2,character3) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 ||matrix[y][x] == character3)
                 {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0, 1);
        var newCells = random(emptyCells);
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
                this.die();
            }

        }
    }
    eat() {
        var emptyCells = this.chooseCell(2,3);
        var newCells = random(emptyCells);
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
            if (this.multiply == 3) {
                this.searchMate();
                this.multiply = 0;
            }
        }
        else {
            this.move();

        }
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCells = random(emptyCells);
        if (newCells) {
            var x = newCells[0];
            var y = newCells[1];
            matrix[y][x] = this.index;
            var Gishaker = new Gishatichaker(x, y, 1);
            GishatichakerArr.push(Gishaker);
        }
    }
    searchMate()
    {
        var otherGrassCells = this.chooseCell(4);

        for(var i in otherGrassCells)
        {
            var x = otherGrassCells[i].x;
            var y = otherGrassCells[i].y;

            for(var j in GishatichakerArr)
            {
                if(GishatichakerArr[j].x == x && GishatichakerArr[j].y == y && this.gender != GishatichakerArr[j].gender )
                {
                    this.mul();
                    return;
                }
            }
        }
    }
    die() {
        for (var i in GishatichakerArr) {
            if (this.x == GishatichakerArr[i].x && this.y == GishatichakerArr[i].y) {
                GishatichakerArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 0;
    }
}