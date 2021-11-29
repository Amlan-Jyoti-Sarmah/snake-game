//global variables
var BOARD = document.getElementById("board");
var BOARD_SIZE = 100;
var start_btn = document.getElementById("start-game");
var IS_PLAYING = false;
var snakePosition = [5, 4, 3, 2, 1];
var foodPosition;
var direction = "E";
var nextHeadPosition = 6;
var GAME_SPEED = 500; //in milisecond
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
    console.log(nextHeadPosition);
    for (var i = 0; i < snakePosition.length; i++) {
        if (i == 0) {
            var pos = nextHeadPosition - snakePosition[i];
            newSnakePosition.push(nextHeadPosition);
            nextHeadPosition = nextHeadPosition + pos;
        }
        else {
            newSnakePosition.push(snakePosition[i - 1]);
        }
    }
    console.log(newSnakePosition);
    return newSnakePosition;
}
//function to draw the snake and clearing the game canvas
function draw(snakePosition) {
    for (var i = 0; i < snakePosition.length; i++) {
        var id = snakePosition[i];
        var element = document.getElementById(id.toString());
        element.classList.add("snake-body");
    }
}
function clearCanvas(snakePosition) {
    for (var i = 0; i < snakePosition.length; i++) {
        var id = snakePosition[i];
        var element = document.getElementById(id.toString());
        element.classList.remove("snake-body");
    }
}
//main loop
function main() {
    clearCanvas(snakePosition);
    snakePosition = calculateSnakePosition(snakePosition);
    draw(snakePosition);
    if (IS_PLAYING) {
        setTimeout(function () {
            window.requestAnimationFrame(main);
        }, GAME_SPEED);
    }
}
//User input
function handleUserInput(event) {
    var key = event.key.toUpperCase();
    console.log(nextHeadPosition);
    if (key === "W" && direction !== "N" && direction !== "S") {
        direction = "N";
        nextHeadPosition = snakePosition[0] - 10;
    }
    else if (key === "S" && direction !== "N" && direction !== "S") {
        direction = "S";
        nextHeadPosition = snakePosition[0] + 10;
    }
    else if (key === "A" && direction !== "W" && direction !== "E") {
        direction = "W";
        nextHeadPosition = snakePosition[0] - 1;
    }
    else if (key === "D" && direction !== "W" && direction !== "E") {
        direction = "E";
        nextHeadPosition = snakePosition[0] + 1;
    }
}
window.addEventListener("keydown", handleUserInput);
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
