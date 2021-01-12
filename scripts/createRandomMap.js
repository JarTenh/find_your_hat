const prompt = require('prompt-sync')({sigint: true});

const createRandomMap = () => {
    let width, height;
    while (true) {
        try {
            width = Number(prompt('How wide should the map be (min 3, max 100)? '));
            if (!width || width < 3 || width > 100) {
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
            height = Number(prompt('How tall should the map be (min 3, max 20)? '));
            if (!height || height < 3 || height > 20) {
                console.log('\nPlease provide a valid input!\n');
            } else {
                break;
            }
        } catch(e) {
            console.log('\nPlease provide a valid input!\n');
        }
    }
    return [width, height];
}

module.exports = createRandomMap;