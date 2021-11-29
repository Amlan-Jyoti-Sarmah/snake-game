//global variables
const BOARD = document.getElementById("board") as HTMLDivElement;
const BOARD_SIZE = 100;
const start_btn = document.getElementById("start-game") as HTMLButtonElement;
let IS_PLAYING = false;
let snakePosition: number[] = [5, 4, 3, 2, 1];
let foodPosition: number;
let direction = "E";
let nextHeadPosition = 6;
const GAME_SPEED = 500; //in milisecond

// rendering the board on screen
const generateBoard = (boardSize: number) => {
  for (let i = 0; i < boardSize; i++) {
    BOARD.innerHTML += `<div id=${i} class="box"></div>`;
  }
};

generateBoard(BOARD_SIZE);

//calculating game stuff
function calculateSnakePosition(snakePosition: number[]) {
  let newSnakePosition: number[] = [];
  console.log(nextHeadPosition);
  for (let i = 0; i < snakePosition.length; i++) {
    if (i == 0) {
      const pos = nextHeadPosition - snakePosition[i];
      newSnakePosition.push(nextHeadPosition);
      nextHeadPosition = nextHeadPosition + pos;
    } else {
      newSnakePosition.push(snakePosition[i - 1]);
    }
  }
  console.log(newSnakePosition);
  return newSnakePosition;
}

//function to draw the snake and clearing the game canvas
function draw(snakePosition: number[]) {
  for (let i = 0; i < snakePosition.length; i++) {
    const id = snakePosition[i];
    const element = document.getElementById(id.toString()) as HTMLDivElement;
    element.classList.add("snake-body");
  }
}
function clearCanvas(snakePosition: number[]) {
  for (let i = 0; i < snakePosition.length; i++) {
    const id = snakePosition[i];
    const element = document.getElementById(id.toString()) as HTMLDivElement;
    element.classList.remove("snake-body");
  }
}
//check win
function checkwin(head: number) {
  if (head < 0 || head > 99) {
    IS_PLAYING = false;
  }
  const deadPositionsEast = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const deadPositionsWest = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
  const deadPositions = 10;
  for (let i = 0; i < deadPositions; i++) {
    if (direction === "E" && head === deadPositionsEast[i]) {
      IS_PLAYING = false;
    }
    if (direction === "W" && head === deadPositionsWest[i]) {
      IS_PLAYING = false;
    }
  }
}
//restart the game
function restartGame() {
  snakePosition = [3, 2, 1];
  direction = "E";
  nextHeadPosition = 4;
  start_btn.innerText = "Restart Game";
}
//main loop
function main() {
  clearCanvas(snakePosition);
  snakePosition = calculateSnakePosition(snakePosition);
  draw(snakePosition);
  checkwin(snakePosition[0]);
  if (IS_PLAYING) {
    setTimeout(() => {
      window.requestAnimationFrame(main);
    }, GAME_SPEED);
  } else {
    clearCanvas(snakePosition);
    restartGame();
  }
}

//User input
function handleUserInput(event: KeyboardEvent) {
  let key = event.key.toUpperCase();
  console.log(nextHeadPosition);
  if (key === "W" && direction !== "N" && direction !== "S") {
    direction = "N";
    nextHeadPosition = snakePosition[0] - 10;
  } else if (key === "S" && direction !== "N" && direction !== "S") {
    direction = "S";
    nextHeadPosition = snakePosition[0] + 10;
  } else if (key === "A" && direction !== "W" && direction !== "E") {
    direction = "W";
    nextHeadPosition = snakePosition[0] - 1;
  } else if (key === "D" && direction !== "W" && direction !== "E") {
    direction = "E";
    nextHeadPosition = snakePosition[0] + 1;
  }
}
window.addEventListener("keydown", handleUserInput);

//initializing and stopping the game
start_btn.addEventListener("click", () => {
  IS_PLAYING = !IS_PLAYING;
  if (IS_PLAYING) {
    start_btn.innerText = "Stop Game";
  } else {
    start_btn.innerText = "Start Game";
  }
  window.requestAnimationFrame(main);
});
