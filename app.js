//global variables
var BOARD = document.getElementById("board");
var BOARD_SIZE = 100;
var start_btn = document.getElementById("start-game");
var IS_PLAYING = false;
// rendering the board on screen
var generateBoard = function (boardSize) {
    for (var i = 0; i < boardSize; i++) {
        BOARD.innerHTML += "<div id=".concat(i, " class=\"box\"></div>");
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
start_btn.addEventListener("click", function () {
    IS_PLAYING = !IS_PLAYING;
    if (IS_PLAYING) {
        start_btn.innerText = "Stop Game";
    }
    else {
        start_btn.innerText = "Start Game";
    }
    window.requestAnimationFrame(main);
});
