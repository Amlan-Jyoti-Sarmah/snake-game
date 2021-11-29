//global variables
const BOARD = document.getElementById("board") as HTMLDivElement;
const BOARD_SIZE = 100;
const start_btn = document.getElementById("start-game") as HTMLButtonElement;
let IS_PLAYING = false;
let snakePosition: number[] = [2, 1];
let foodPosition: number;
let direction = "E";
let nextHeadPosition = 3;

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
  for (let i = 0; i < snakePosition.length; i++) {
    if (i == 0) {
      const pos = snakePosition[i] - snakePosition[i + 1];
      newSnakePosition.push(nextHeadPosition);
      nextHeadPosition = nextHeadPosition + pos;
      console.log(newSnakePosition, nextHeadPosition);
    } else {
      newSnakePosition.push(snakePosition[i - 1]);
    }
  }
  console.log(newSnakePosition);
  return newSnakePosition;
}

//main loop
function main() {
  snakePosition = calculateSnakePosition(snakePosition);
  console.log(snakePosition);
  if (IS_PLAYING) {
    window.requestAnimationFrame(main);
  }
}

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
