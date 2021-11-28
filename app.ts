//global variables
const BOARD = document.getElementById("board") as HTMLDivElement;
const BOARD_SIZE = 100;
const start_btn = document.getElementById("start-game") as HTMLButtonElement;
let IS_PLAYING = false;

// rendering the board on screen
const generateBoard = (boardSize: number) => {
  for (let i = 0; i < boardSize; i++) {
    BOARD.innerHTML += `<div id=${i} class="box"></div>`;
  }
};

generateBoard(BOARD_SIZE);

//main loop
function main() {
  console.log("Run!!");
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
