let cells = document.querySelectorAll("[data-cell]");
const resultMessage = document.getElementById("result-message");
const resultScreen = document.getElementById("result-screen");
const restartBtn = document.getElementById("restart-btn");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");

let isXTurn = true;
let scoreXCount = 0;
let scoreOCount = 0;

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove("x", "o", "win");
    cell.textContent = "";
    cell.replaceWith(cell.cloneNode(true)); // remove listeners
  });

  cells = document.querySelectorAll("[data-cell]");
  cells.forEach(cell => {
    cell.addEventListener("click", handleClick, { once: true });
  });

  resultScreen.classList.add("hide");
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();

  const winCombo = getWinningCombination(currentClass);
  if (winCombo) {
    highlightWinningCells(winCombo);
    updateScore(currentClass);
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(draw) {
  if (draw) {
    resultMessage.innerText = "It's a Draw!";
  } else {
    resultMessage.innerText = `${isXTurn ? "Player X" : "Player O"} Wins!`;
  }
  resultScreen.classList.remove("hide");
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains("x") || cell.classList.contains("o")
  );
}

function getWinningCombination(currentClass) {
  return WIN_COMBINATIONS.find(combination =>
    combination.every(index => cells[index].classList.contains(currentClass))
  );
}

function highlightWinningCells(combination) {
  combination.forEach(index => {
    cells[index].classList.add("win");
  });
}

function updateScore(player) {
  if (player === "x") {
    scoreXCount++;
    scoreX.textContent = scoreXCount;
  } else {
    scoreOCount++;
    scoreO.textContent = scoreOCount;
  }
}

restartBtn.addEventListener("click", startGame);
