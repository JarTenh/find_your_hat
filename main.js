const prompt = require('prompt-sync')({sigint: true});
const Field = require('./scripts/Field');
const makeMove = require('./scripts/makeMove');
const hatFound = require('./scripts/hatFound');
const routeIsPossible = require('./scripts/routeIsPossible');
const drawOptimalRoute = require('./scripts/drawOptimalRoute');
const createRandomMap = require('./scripts/createRandomMap');
const myField = new Field();
let stepsTaken = 0;
let currentSpot = []; // This will be the players current spot, in format [y-coord, x-coord]

// Function to start the game and determine the map dimensions
const startTheGame = () => {
    console.clear(); // Clears the console, to notify the user that the game has started
    console.log('\n********* Welcome! ********** \nYou\'re playing the famous game Find Your Hat!\n');
    console.log('Your job is to find your hat in this maze-like field.')
    console.log('Your starting position and the tiles you have visited are marked with \'*\' and your hat with \'^\'\n');
    while (true) {
        let answer = prompt('You want to play the game or not (y/n)? ');
        if (answer === 'n') {
            console.log('Goodbye!');
            process.exit();
        } else if (answer !== 'y') {
            console.log('Invalid input, please type \'y or \'n.');
        } else {
            console.log('\nLet\'s first determine the map dimensions!');
            let dimensions = createRandomMap();
            myField.createMap(dimensions[0], dimensions[1]);
            // In javascript, arrays are passed by reference, so
            // this creates a copy of the field-object's starting point using ES6 syntax.
            currentSpot = [...myField.starting_pos];
            break;
        }
    }
    console.clear();
}

// Intro and the beginning of the game!
startTheGame();
while (true) {
    console.log('\n');
    myField.print();
    console.log(`Steps taken so far: ${stepsTaken}`);
    console.log('\nMove keys: Up (w), Down (s), Left (a), Right (d), ')
    const move = prompt('Which way you want to go (press "ctrl + c" to quit)? ');
    if (['w', 's', 'a', 'd'].includes(move)) {
        if (makeMove(move, currentSpot, myField.field)) {
            stepsTaken++;
            if (hatFound(currentSpot, myField.field)) {
                myField.markPath(currentSpot);
                console.clear();
                console.log('\n');
                myField.print();
                console.log(`Steps taken so far: ${stepsTaken}`);
                console.log('\nWOW! You found your hat! Congratulations!\n');
                while (true) {
                    let showOptimal = prompt('Would you like to see the optimal route (y/n)? ');
                    if (showOptimal === 'n') {
                        console.log('Very well, thank you for playing!');
                        process.exit();
                    } else if (showOptimal !== 'y') {
                        console.log('Invalid input, please try again!\n');
                    } else {
                        console.log('This was the optimal route:\n');
                        drawOptimalRoute(routeIsPossible(myField.starting_pos, myField.originalField), myField.originalField);
                        prompt('Press any key and \'enter\' to exit. ');
                        process.exit();
                    }
                }
            }
            myField.markPath(currentSpot);
            console.clear();
        } else {
            console.log('\nGame Over!');
            process.exit();
        }
    } else {
        console.clear();
        console.log('Invalid input! Please try again.');
    }
}
