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
//check win
function checkwin(head) {
    var deadPositionsEast = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    var deadPositionsWest = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    var deadPositionsNorth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var deadPositionsSouth = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
    var deadPositions = 10;
    for (var i = 0; i < deadPositions; i++) {
        if (direction === "E" && head === deadPositionsEast[i]) {
            IS_PLAYING = false;
        }
        if (direction === "W" && head === deadPositionsWest[i]) {
            IS_PLAYING = false;
        }
        if (direction === "N" && head === deadPositionsNorth[i]) {
            IS_PLAYING = false;
        }
        if (direction === "S" && head === deadPositionsSouth[i]) {
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
        setTimeout(function () {
            window.requestAnimationFrame(main);
        }, GAME_SPEED);
    }
    else {
        restartGame();
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
    for (var i = 0; i < 100; i++) {
        var element = document.getElementById(i.toString());
        if (element.classList.contains("snake-body")) {
            element.classList.remove("snake-body");
        }
    }
    IS_PLAYING = !IS_PLAYING;
    if (IS_PLAYING) {
        start_btn.innerText = "Stop Game";
    }
    else {
        start_btn.innerText = "Start Game";
    }
    window.requestAnimationFrame(main);
});
