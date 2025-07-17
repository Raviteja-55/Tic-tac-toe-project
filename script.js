const cells = document.querySelectorAll("[data-cell]");
const resultMessage = document.getElementById("result-message");
const resultScreen = document.getElementById("result-screen");
const restartBtn = document.getElementById("restart-btn");

let isXTurn = true;

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
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleClick, { once: true });
  });
  resultScreen.classList.add("hide");
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
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
  return [...cells].every(cell => cell.classList.contains("x") || cell.classList.contains("o"));
}

function checkWin(currentClass) {
  return WIN_COMBINATIONS.some(combination => {
    return combination.every(index => cells[index].classList.contains(currentClass));
  });
}

restartBtn.addEventListener("click", startGame);
