//global variables
var BOARD = document.getElementById("board");
var BOARD_SIZE = 100;
var start_btn = document.getElementById("start-game");
var IS_PLAYING = false;
var snakePosition = [2, 1];
var foodPosition;
var direction = "E";
var nextHeadPosition = 3;
// rendering the board on screen
var generateBoard = function (boardSize) {
    for (var i = 0; i < boardSize; i++) {
        BOARD.innerHTML += "<div id=".concat(i, " class=\"box\"></div>");
    }
};
generateBoard(BOARD_SIZE);
//calculating game stuff
function calculateSnakePosition(snakePosition) {
    var newSnakePosition = [];
    for (var i = 0; i < snakePosition.length; i++) {
        if (i == 0) {
            var pos = snakePosition[i] - snakePosition[i + 1];
            newSnakePosition.push(nextHeadPosition);
            nextHeadPosition = nextHeadPosition + pos;
            console.log(newSnakePosition, nextHeadPosition);
        }
        else {
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
