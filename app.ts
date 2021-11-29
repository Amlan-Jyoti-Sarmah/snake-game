//global variables
const BOARD = document.getElementById("board") as HTMLDivElement;
const BOARD_SIZE = 100;
const start_btn = document.getElementById("start-game") as HTMLButtonElement;
let IS_PLAYING = false;
let snakePosition: number[] = [3, 2, 1];
let foodPosition: number;
let direction = "E";
let nextHeadPosition = 4;
const GAME_SPEED = 500; //in milisecond
let isFoodExist = false;
let score = 0;
const SCORE_BOARD = document.getElementById("score") as HTMLParagraphElement;

// rendering the board on screen
const generateBoard = (boardSize: number) => {
  for (let i = 0; i < boardSize; i++) {
    BOARD.innerHTML += `<div id=${i} class="box"></div>`;
  }
};

generateBoard(BOARD_SIZE);

//calculating snake position
function calculateSnakePosition(snakePosition: number[]) {
  let newSnakePosition: number[] = [];
  for (let i = 0; i < snakePosition.length; i++) {
    if (i == 0) {
      const pos = nextHeadPosition - snakePosition[i];
      newSnakePosition.push(nextHeadPosition);
      nextHeadPosition = nextHeadPosition + pos;
    } else {
      newSnakePosition.push(snakePosition[i - 1]);
    }
  }
  return newSnakePosition;
}

//function to draw the snake and clearing the game canvas
function draw(snakePosition: number[]) {
  for (let i = 0; i < snakePosition.length; i++) {
    const id = snakePosition[i];
    const element = document.getElementById(id.toString()) as HTMLDivElement;
    if (element) element.classList.add("snake-body");
  }
}
function clearCanvas(snakePosition: number[]) {
  for (let i = 0; i < snakePosition.length; i++) {
    const id = snakePosition[i];
    const element = document.getElementById(id.toString()) as HTMLDivElement;
    if (element) element.classList.remove("snake-body");
  }
}

//function to manage food location , display and consumption 
function locateFood(snakePosition: number[]) {
  let foodLocation = 0;
  let isFound = false;
  while (!isFound) {
    const food = Math.floor(Math.random() * 100);
    for (let i = 0; i < snakePosition.length; i++) {
      if (food !== snakePosition[i]) {
        isFound = true;
        foodLocation = food;
        break;
      }
    }
  }
  return foodLocation;
}
function displayFood(snakePosition: number[]) {
  const location = locateFood(snakePosition);
  const element = document.getElementById(
    location.toString()
  ) as HTMLDivElement;
  element.classList.add("food");
}
function eatfood(head: number) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    const element = document.getElementById(i.toString()) as HTMLDivElement;
    if (element.classList.contains("food") && i === head) {
      element.classList.remove("food");
      isFoodExist = false;
      score += 1;
      SCORE_BOARD.innerText = score.toString();
      if (snakePosition.length < 7) {
        const size = snakePosition[1] - snakePosition[0];
        const add = snakePosition[snakePosition.length - 1] + size;
        snakePosition.push(add);
      }
    }
  }
}

//check win
function checkwin(head: number) {
  const deadPositionsEast = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const deadPositionsWest = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
  const deadPositions = 10;
  const element = document.getElementById(head.toString()) as HTMLDivElement;
  if (!element) {
    IS_PLAYING = false;
  }
  for (let i = 0; i < deadPositions; i++) {
    if (direction === "W" && head === deadPositionsEast[i]) {
      IS_PLAYING = false;
    }
    if (direction === "E" && head === deadPositionsWest[i]) {
      IS_PLAYING = false;
    }
  }
}

//restart the game
function restartGame() {
  snakePosition = [3, 2, 1];
  direction = "E";
  nextHeadPosition = 4;
  score = 0;
  isFoodExist = false;
  SCORE_BOARD.innerText = score.toString();
  start_btn.innerText = "Restart Game";
  start_btn.classList.remove("disabled");
}
//main loop
function main() {
  checkwin(snakePosition[0]);
  if (isFoodExist) {
    eatfood(snakePosition[0]);
  } else {
    displayFood(snakePosition);
    isFoodExist = true;
  }
  clearCanvas(snakePosition);
  snakePosition = calculateSnakePosition(snakePosition);
  draw(snakePosition);
  if (IS_PLAYING) {
    setTimeout(() => {
      window.requestAnimationFrame(main);
    }, GAME_SPEED);
  } else {
    restartGame();
  }
}

//User input
function handleUserInput(event: KeyboardEvent) {
  let key = event.key.toUpperCase();
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
  for (let i = 0; i < 100; i++) {
    const element = document.getElementById(i.toString()) as HTMLDivElement;
    if (element.classList.contains("snake-body")) {
      element.classList.remove("snake-body");
    }
    if (element.classList.contains("food")) {
      element.classList.remove("food");
    }
  }
  IS_PLAYING = !IS_PLAYING;
  start_btn.classList.add("disabled");
  window.requestAnimationFrame(main);
});
