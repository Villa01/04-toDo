const ToDo = require("./toDo");
require('colors');

class ToDos {

    _list = {};

    get listArray() {
        const list = [];

        Object.keys(this._list).forEach( key => list.push(this._list[key]));

        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteToDo( id = '') {
        if ( this._list[id]){
            delete this._list[id];
        }
    }

    loadToDosFromArray( toDos = [] ){
        toDos.forEach(({ desc, id, completedIn }) => {
            const newToDo = new ToDo(desc);
            newToDo.id = id;
            newToDo.completedIn = completedIn;
            this._list[id] = newToDo;
        });
    }

    createToDo(desc = ''){
        const toDo = new ToDo(desc)
        this._list[toDo.id] = toDo;
    }

    showList() {
        console.log();
        this.listArray.forEach( ({completedIn, desc}, i) => {
            const index = `${i + 1}.`.green
            let printing = `${index} ${desc} :: ${completedIn? 'Accomplished'.green: 'Pending'.red}`
            console.log(printing)
        })
    }

    listAccomplished( completed = true ){
        console.log();
        let i = 1;
        this.listArray.forEach( ({completedIn, desc}) => {
            const index = `${i}.`.green
            let printing = `${index} ${desc} :: ${completedIn? 'Accomplished'.green + ` ${completedIn.green}`: 'Pending'.red}`

            if ( completed && completedIn){
                console.log(printing);
            }
            if ( !completed && !completedIn) {
                console.log(printing);
            }
            i += 1;

        })
    }

    toggleCompletedtoDos ( ids = [] ){
        ids.forEach( id => {
            this.toggleCompletedToDo(id);
        });

        this.listArray.forEach( toDo => {
            if ( !ids.includes(toDo.id)){
                this._list[toDo.id].completedIn = null;
            }
        })
    }

    toggleCompletedToDo( id ){
        const toDo = this._list[id];
        if( !toDo.completedIn ) {
            toDo.completedIn = new Date().toISOString();
        }
    }
}

module.exports = ToDos;