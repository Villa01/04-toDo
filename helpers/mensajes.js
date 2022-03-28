

require('colors');

const showMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('==============================='.green);
        console.log('       Select an option: '.green);
        console.log('===============================\n'.green);

        console.log(`${'1.'.green} Create a to do. `);
        console.log(`${'2.'.green} List to do's.`);
        console.log(`${'3.'.green} List to accomplished do's. `);
        console.log(`${'4.'.green} List to pending do's. `);
        console.log(`${'5.'.green} Accomplish to do's.`);
        console.log(`${'6.'.green} Delete to do's.`);
        console.log(`${'0.'.green} Exit\n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question('Select an option: ', opt => {
            readLine.close();
            resolve(opt);
        });
    });
}

const pause = () => {

    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question(`\nPress ${'ENTER'.green} to continue...\n`, () => {
            readLine.close();
            resolve();
        });
    });
}


module.exports = {
    showMenu,
    pause
}