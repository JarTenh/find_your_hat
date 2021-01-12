// This module draws one of the optimal routes based on
// the results gotten from routeIsPossible algorithm

const draw = (route, field) => {
    for (let i = 0; i < route.length; i++) {
        field[route[i][0]][route[i][1]] = "*";
    }
    for (let i = 0; i < field.length; i++) {
        console.log(field[i].join(''));
    }
}

module.exports = draw;