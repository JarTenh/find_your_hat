const routeIsPossible = require('../scripts/routeIsPossible');

const fieldCharacter = '░';
const pathCharacter = '*';
const hole = 'O';
const hat = '^';

class Field {
    constructor() {
        this._originalField = [];
        this._field = [];
        this._starting_pos = [];
    }

    get field() {
        return this._field;
    }

    get starting_pos() {
        return this._starting_pos;
    }

    get originalField() {
        return this._originalField;
    }

    createMap(x, y) {
        // Build the random field
        for (let i = 0; i < y; i++) {
            this._field.push([]);
            for (let j = 0; j < x; j++) {
                let randomNum = Math.random();
                if (randomNum < 0.25) {
                    this._field[i].push(hole);
                } else {
                    this._field[i].push(fieldCharacter);
                }
            }
        }

        // Put the character in a random starting position
        let randomX = Math.floor(Math.random() * this._field[0].length);
        let randomY = Math.floor(Math.random() * this._field.length);
        this._field[randomY][randomX] = pathCharacter;
        this._starting_pos = [randomY, randomX];

        // Put the hat in a random starting position, so that it's not the same square as the character
        while (true) {
            randomX = Math.floor(Math.random() * this._field[0].length);
            randomY = Math.floor(Math.random() * this._field.length);
            if (this._field[randomY][randomX] !== pathCharacter) {
                this._field[randomY][randomX] = hat;
                break;
            }
        }

        if (routeIsPossible(this._starting_pos, this._field) === -1) {
            this._field = [];
            this._originalField = [];
            this._starting_pos = [];
            this.createMap(x, y);
        } else {
            // Creates a deep copy of a field for drawing the optimal route eventually
            for (let i = 0; i < this._field.length; i++) {
                this._originalField.push([]);
                for (let j = 0; j < this._field[0].length; j++) {
                    this._originalField[i].push(this._field[i][j]);
                }
            }
        }
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