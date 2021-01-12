const prompt = require('prompt-sync')({sigint: true});
const Field = require('./Field');
const makeMove = require('./makeMove');
const hatFound = require('./hatFound');
const routeIsPossible = require('./routeIsPossible');
const drawOptimalRoute = require('./drawOptimalRoute');

const myField = new Field();
// This will be the players current spot, in format [y-coord, x-coord]
let currentSpot = [];

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
            let width, height;
            while (true) {
                try {
                    width = Number(prompt('How wide should the map be (min 3, max 50? '));
                    if (!width || width < 3 || width > 50) {
                        console.log('\nPlease provide a valid input!\n');
                    } else {
                        break;
                    }
                } catch(e) {
                    console.log('\nPlease provide a valid input!\n');
                }
            }
            while (true) {
                try {
                    height = Number(prompt('How tall should the map be (min 3, max 20? '));
                    if (!height || height < 3 || height > 20) {
                        console.log('\nPlease provide a valid input!\n');
                    } else {
                        break;
                    }
                } catch(e) {
                    console.log('\nPlease provide a valid input!\n');
                }
            }
            myField.createMap(width, height);
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
    console.log('\nMove keys: Up (w), Down (s), Left (a), Right (d), ')
    const move = prompt('Which way you want to go (press "ctrl + c" to quit)? ');
    if (['w', 's', 'a', 'd'].includes(move)) {
        if (makeMove(move, currentSpot, myField.field)) {
            if (hatFound(currentSpot, myField.field)) {
                console.log('\nWOW! You found your hat! Congratulations!\n');
                console.log('This was the optimal route:\n');
                drawOptimalRoute(routeIsPossible(myField.starting_pos, myField.originalField), myField.originalField);
                process.exit();
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
