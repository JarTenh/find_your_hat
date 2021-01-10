const fieldCharacter = '░';
const pathCharacter = '*';
const hole = 'O';
const hat = '^';

class Field {
    constructor(field) {
        this._field = field;
    }

    get field() {
        return this._field;
    }

    print() {
        for (let i = 0; i < this._field.length; i++) {
            console.log(this._field[i].join(''));
        }
    }

    markPath(currentSpot) {
        this._field[currentSpot[0]][currentSpot[1]] = pathCharacter;
    }
}

module.exports = Field;