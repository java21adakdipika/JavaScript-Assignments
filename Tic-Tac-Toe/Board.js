const Cell = require("./Cell")

class Board{
    constructor () {
        this.cells = [
            new Cell(),
            new Cell(),
            new Cell(),
            new Cell(),
            new Cell(),
            new Cell(),
            new Cell(),
            new Cell(),
            new Cell(),
        ]
    }

    isCellMarked(cellNumber){
        if (this.cells[cellNumber].isMarked()){
            return true
        }
        return false
    }

    analyseResult(){
        if ((this.cells[0].mark == this.cells[1].mark && this.cells[0].mark == this.cells[2].mark) && this.cells[2].isMarked()){
            return [this.cells[2].mark, "Winner"]
        }
        if ((this.cells[3].mark == this.cells[4].mark && this.cells[3].mark == this.cells[5].mark) && this.cells[5].isMarked()){
            return [this.cells[5].mark, "Winner"]
        }
        if ((this.cells[6].mark == this.cells[7].mark && this.cells[6].mark == this.cells[8].mark) && this.cells[8].isMarked()){
            return [this.cells[8].mark, "Winner"]
        }
        if ((this.cells[0].mark == this.cells[3].mark && this.cells[0].mark == this.cells[6].mark) && this.cells[6].isMarked()){
            return [this.cells[6].mark, "Winner"]
        }
        if ((this.cells[1].mark == this.cells[4].mark && this.cells[1].mark == this.cells[7].mark) && this.cells[7].isMarked()){
            return [this.cells[7].mark, "Winner"]
        }
        if ((this.cells[2].mark == this.cells[5].mark && this.cells[2].mark == this.cells[8].mark) && this.cells[8].isMarked()){
            return [this.cells[8].mark, "Winner"]
        }
        if ((this.cells[0].mark == this.cells[4].mark && this.cells[0].mark == this.cells[8].mark) && this.cells[8].isMarked()){
            return [this.cells[8].mark, "Winner"]
        }
        if ((this.cells[2].mark == this.cells[4].mark && this.cells[2].mark == this.cells[6].mark) && this.cells[6].isMarked()){
            return [this.cells[6].mark, "Winner"]
        }
        if (this.cells[0].isMarked() && this.cells[1].isMarked() && this.cells[2].isMarked()
            && this.cells[3].isMarked() && this.cells[4].isMarked() && this.cells[5].isMarked()
            && this.cells[6].isMarked() && this.cells[7].isMarked() && this.cells[8].isMarked()){
            return ["No one won", "Draw"]
        }
        return [" ", " "]
    }

    printBoard(){
        console.log(this.cells[0].mark + " " + this.cells[1].mark + " " + this.cells[2].mark )
        console.log(this.cells[3].mark + " " + this.cells[4].mark + " " + this.cells[5].mark )
        console.log(this.cells[6].mark + " " + this.cells[7].mark + " " + this.cells[8].mark )
    }
}

module.exports = Board