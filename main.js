const prompt = require('prompt-sync')({sigint: true});
const Field = require('./Field');
const makeMove = require('./makeMove');
const hatFound = require('./hatFound');

// Clears the console, to notify the user that the game has started
console.clear();

// This is the players current spot, in format [y-coord, x-coord]
let currentSpot = [0, 0];

// Creates the field for the game
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

const startTheGame = () => {
    console.log()
    console.log('********* Welcome! ********** \n You\'re playing the famous game Find Your Hat!\n');
    console.log('Your job is to find your hat in this maze-like field.')
    console.log('Your starting position and the tiles you have visited are marked with "*" and your hat with "^"');
    console.log()
    while (true) {
        let answer = prompt('You want to play the game or not (y/n)?' );
        if (answer === 'n') {
            console.log('Goodbye!');
            process.exit();
        } else if (answer !== 'y') {
            console.log('Invalid input, please type \'y or \'n.');
        } else {
            break;
        }
    }
    console.clear();
}

// Intro and the beginning of the game!
startTheGame();
while (true) {
    myField.print();
    console.log();
    console.log('Move keys: Up (w), Down (s), Left (a), Right (d), ')
    const move = prompt('Which way you want to go (press "ctrl + c" to quit)? ');
    if (['w', 's', 'a', 'd'].includes(move)) {
        if (makeMove(move, currentSpot, myField.field)) {
            if (hatFound(currentSpot, myField.field)) {
                console.log('\nWOW! You found your hat! Congratulations!\n');
                process.exit();
            }
            myField.markPath(currentSpot);
            console.clear();
        } else {
            console.log();
            console.log('Game Over!');
            process.exit();
        }
    } else {
        console.log('Invalid input! Please try again. \n');
    }
}
