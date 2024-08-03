// MVC
//Model - Manages data
const squares = Array.from(document.getElementsByClassName("square"));
squares.forEach(square => square.classList.add("square-hover"));
const menu = document.getElementById("menu");
const resetBtn = document.getElementById("reset-btn");
const menuTxt = document.getElementById("menu-text");
const offlineSec = document.getElementById("offline")
const offlineSecBtn = document.getElementById("offline-game-btn")
const playerGuide = document.getElementById("player-turn-guide")

let gameOver = false;
let numberOfTurns = 0;

const players = ["Player 1", "Player 2"];

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
  [squares[2], squares[4], squares[6]],
];

function nextTurn() {
  if (turn.includes("Player 1")) {
    turn = players[1];
  } else {
    turn = players[0];
  }
}

function checkForWin() {
  sets.forEach((array) => {
    let firstItem = array[0].firstElementChild.textContent;
    if (checkArraySimilarity(array, firstItem)) {
      gameOver = true;
      gameOverDisplay();
    }
  });
}

//Checks all items in array are the same, excluding being empty

function checkArraySimilarity(array, firstItem) {
  return array.every((item) => item.firstElementChild.textContent != "") &&
    array.every((item) => item.firstElementChild.textContent === firstItem)
}

function gameOverDisplay() {
  nextTurn()
  squares.forEach(square => {
    square.style.cursor = "not-allowed"
    square.classList.remove("square-hover")
  })
  playerGuide.textContent = `${turn} won the game`
}

//View - Manages the diplay
function addPlay(firstChild) {
  if (turn.includes("Player 1")) {
    firstChild.textContent = "x";
  } else {
    firstChild.textContent = "o";
  }
}

function setOfflineDisplay() {
  const sections = document.querySelectorAll("section")
  sections.forEach(section => section.style.display = "none")
  offlineSec.style.display = "flex"
}

function changeTurnDisplay(turn) {
  if (turn === "Player 1") {
    playerGuide.classList.remove("player2-turn")
    playerGuide.textContent = `Player 1 turn`
  }else {
    playerGuide.classList.add("player2-turn")
    playerGuide.textContent = `Player 2 turn`
  }
}

//  Controller - Controls intreractions between view and model
let turn = players[0];

offlineSecBtn.addEventListener('click', setOfflineDisplay)

squares.forEach((square) => {
  square.addEventListener("click", function () {
    squaredClicked(square);
  });
});

function squaredClicked(square) {
  let firstChild = square.firstElementChild;

  if (firstChild.textContent === "" && !gameOver && numberOfTurns <= 9) {
    addPlay(firstChild);

    nextTurn();

    changeTurnDisplay(turn);

    numberOfTurns++
  }
  
  if (numberOfTurns >= 9 && !gameOver) {

    gameOverDisplay()
    playerGuide.textContent = `DRAW. No one won the game.`;
  }

  checkForWin();
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  gameOver = false;
  numberOfTurns = 0;
  turn = players[0];

  squares.forEach((square) => {
    square.firstElementChild.textContent = "";
    square.classList.add("square-hover")
    square.style.cursor = "default"
  });

  changeTurnDisplay(turn)
}