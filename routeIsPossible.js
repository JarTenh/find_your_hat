// This module uses dfs-algorithm to determine if the given field
// is possible to solve. If the field is possible to solve, the
// function returns the shortest route to the hat.

const possible = (startPos, field) => {
    let n = field.length;
    let m = field[0].length;
    let distances = {};
    let queue = [startPos];
    let moves = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    distances[startPos] = 0;
    let i = 0;
    while (i < queue.length) {
        let myPos = queue[i];
        if (field[myPos[0]][myPos[1]] === "^") {
            return distances[myPos];
        }
        for (let i = 0; i < moves.length; i++) {
            let newPos = [myPos[0] + moves[i][0], myPos[1] + moves[i][1]];
            if (newPos[0] < 0 || newPos[0] >= field.length || newPos[1] < 0 || newPos[1] >= field[0].length) {
                continue;
            }
            if (field[newPos[0]][newPos[1]] === 'O') {
                continue;
            }
            if (!distances[newPos]) {
                distances[newPos] = distances[myPos] + 1;
                queue.push(newPos);
            }
        }
        i++;
    }
    return -1;
}

module.exports = possible;