function getRandInt() {
    var z = Math.floor(Math.random());
    return z;
}

module.exports = class Grass {
    constructor(x, y, index, matrix) {
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul(matrix) {
        this.multiply++;
        var newCell = getRandInt(this.chooseCell(0, matrix));
        //console.log(newCell, this.multiply);
        if (this.multiply >= 30 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            console.log(matrix[0]+"!!!!!!\n");
            matrix[newCell[1]][newCell[0]] = 1;
            console.log(matrix[0]+"//////\n");
            this.multiply = 0;
        }
    }
}