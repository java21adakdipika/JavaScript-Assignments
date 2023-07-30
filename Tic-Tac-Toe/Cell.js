class Cell {
    constructor() {
        this.mark = '-'
    }

    isMarked(){
        if (this.mark != '-'){
            return true
        }
        return false
    }
}

module.exports = Cell