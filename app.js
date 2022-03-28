require('colors');


const { inquirerMenu,
    pause,
    readInput,
    listDeleteToDo,
    confirm,
    completeCheckList
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/database');
const ToDos = require('./models/toDos');


const main = async () => {
    console.clear();

    let opt = '';
    const toDos = new ToDos();

    const dbToDos = readDB();

    if (dbToDos) {
        toDos.loadToDosFromArray(dbToDos);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // Create  
                console.log('Create')
                const desc = await readInput('Description: ');
                toDos.createToDo(desc);
                break;

            case '2':
                // List
                toDos.showList();
                break;

            case '3':
                toDos.listAccomplished(true);
                break;

            case '4':
                toDos.listAccomplished(false);
                break;

            case '5':
                const ids = await completeCheckList(toDos.listArray);
                toDos.toggleCompletedtoDos(ids);
                
                break;
            case '6':
                const id = await listDeleteToDo(toDos.listArray);
                if ( id != 0){
                    const ok = await confirm('Are you sure? ');
                    if ( ok ){
                        toDos.deleteToDo(id);
                        console.log('To do', 'deleted'.red)
                    }
                }
                break;
        }

        saveDB(toDos.listArray);

        await pause();
    } while (opt !== '0');

}


main();