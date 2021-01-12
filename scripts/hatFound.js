const hatFound = (currentSpot, field) => {
    if (field[currentSpot[0]][currentSpot[1]] === '^') {
        return true;
    }
    return false;
}

module.exports = hatFound;