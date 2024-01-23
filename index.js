// MVC

//Model - Manages data
const squares = Array.from(document.getElementsByClassName('square'))
const menu = document.getElementById('menu')
const resetBtn = document.getElementById('reset-btn')
const menuTxt = document.getElementById('menu-text')

let gameOver = false
let numberOfTurns = 0

const players = ["player1", "player2"]

const sets = [
    //columns
    [squares[0], squares[1], squares[2]],
    [squares[3], squares[4], squares[5]],
    [squares[6], squares[7], squares[8]],

    //rows
    [squares[0], squares[3], squares[6]],
    [squares[1], squares[4], squares[7]],
    [squares[2], squares[5], squares[8]],

    //diagonals
    [squares[0], squares[4], squares[8]],
    [squares[2], squares[4], squares[6]]
    
]

function nextTurn() {
    if (turn.includes("player1")) {

        turn = players[1]

    }else {

        turn = players[0]

    }
}

function checkForWin() {
    sets.forEach(array => {
        let firstItem = array[0].firstElementChild.textContent
        if (checkArraySimilarity(array, firstItem)) {
            console.log("win")
            gameOver = true
            gameOverDisplay()
        }
    })
}

//Checks all items in array are the same, excluding being empty

function checkArraySimilarity(array, firstItem) {
    if (
        array.every(item => item.firstElementChild.textContent != "") && 
        array.every(item => item.firstElementChild.textContent === firstItem)) 
        {
            return true
    }
    return false
}

function gameOverDisplay() {
    console.log("gameOverDisplay")
    menu.style.display = "flex"
    resetBtn.textContent = "reset"
    menuTxt.textContent = `${turn} won the game`
}

//View - Manages the diplay
function addPlay(firstChild) {

    if (turn.includes("player1")) {

        firstChild.textContent = "x"

    }else {

        firstChild.textContent = "o"

    }
}

//Controller - Controls intreractions between view and model
let turn = players[0]

squares.forEach(square => { square.addEventListener("click", function() {
        squaredClicked(square) 
    }) 
})

resetBtn.addEventListener("click", resetGame)

function squaredClicked(square) {
    let firstChild = square.firstElementChild

    if (firstChild.textContent === "" && !gameOver) {
        addPlay(firstChild)

        checkForWin()

        nextTurn()
    }
}

function resetGame() {
    gameOver = false
    numberOfTurns = 0
    turn = players[0]

    squares.forEach(square => {square.firstElementChild.textContent = ""})

    menu.style.display = "none"
    resetBtn.textContent = ""
}