const outOfBounds = (direction, currentSpot, field) => {
    if (currentSpot[1] === 0 && direction === 'a') {
        return true;
    }
    if (currentSpot[1] === field[0].length - 1 && direction === 'd') {
        return true;
    }
    if (currentSpot[0] === 0 && direction === 'w') {
        return true;
    }
    if (currentSpot[0] === field.length - 1 && direction === 's') {
        return true;
    }
    return false;
}

const thereIsAStone = (direction, currentSpot, field) => {
    if (direction === 'a') {
        if (field[currentSpot[0]][currentSpot[1] - 1] === 'O') {
            return true;
        }
    } else if (direction === 'd') {
        if (field[currentSpot[0]][currentSpot[1] + 1] === 'O') {
            return true;
        }
    } else if (direction === 'w') {
        if (field[currentSpot[0] - 1][currentSpot[1]] === 'O') {
            return true;
        }
    } else if (direction === 's') {
        if (field[currentSpot[0] + 1][currentSpot[1]] === 'O') {
            return true;
        }
    }
    return false;
}

const makeMove = (direction, currentSpot, field) => {
    if (!outOfBounds(direction, currentSpot, field)) {
        if (!thereIsAStone(direction, currentSpot, field)) {
            if (direction === 'a') {
                currentSpot[1] -= 1;
            } else if (direction === 'd') {
                currentSpot[1] += 1;
            } else if (direction === 'w') {
                currentSpot[0] -= 1;
            } else if (direction === 's') {
                currentSpot[0] += 1;
            }
            return true;
        } else {
            console.log('Oh no! You fell into a big hole!');
        }
    } else {
        console.log('Oh no! It\'s the end of the world!')
    }
    return false;
}
module.exports = makeMove;