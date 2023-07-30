const Board = require("./Board")
const Player = require("./Player")

class Game{
    constructor(board, players) {
        this.players = players
        this.board = board
        this.turn = 0
        this.isGameOver = false
    }

    static newGame(player0Name, player1Name){
        if (typeof(player0Name) != 'string'){
            return "Inavlid Name for Player 1"
        }

        if (typeof(player1Name) != 'string'){
            return "Inavlid Name for Player 2"
        }

        let gameBoard = new Board()
        let player0 = new Player('X', player0Name)
        let player1 = new Player('O', player1Name)

        return new Game(gameBoard, [player0, player1])
    }
    
    play(cellNumber) {
        if (this.isGameOver){
            return "Game Over"
        }

        if (cellNumber<0 || cellNumber>8){
            return "Invalid Cell Number"
        }

        if (this.board.isCellMarked(cellNumber)){
            return "This cell is already marked."
        }

        if (this.turn%2==0){
            this.board.cells[cellNumber].mark = 'X'
        } else {
            this.board.cells[cellNumber].mark = 'O'
        }
        this.turn++
        this.board.printBoard()
        let [symbol, gameStatus] = this.board.analyseResult()

        if (gameStatus == " "){
            return "Continue Playing"
        }
        if (symbol == this.players[0].symbol){
            this.isGameOver = true
            return this.players[0].name + " is Winnner"
        }
        if (symbol == this.players[1].symbol){
            this.isGameOver = true
            return this.players[1].name + " is Winnner"
        }
        if (gameStatus == "Draw"){
            this.isGameOver = true
            return "No One Win, Draw"
        }
        // return "Continue Playing"
    }
}

module.exports = Game