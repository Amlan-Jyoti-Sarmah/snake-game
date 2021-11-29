//global variables
var BOARD = document.getElementById("board");
var BOARD_SIZE = 100;
var start_btn = document.getElementById("start-game");
var IS_PLAYING = false;
var snakePosition = [3, 2, 1];
var foodPosition;
var direction = "E";
var nextHeadPosition = 4;
var GAME_SPEED = 500; //in milisecond
var isFoodExist = false;
var score = 0;
var SCORE_BOARD = document.getElementById("score");
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
            var pos = nextHeadPosition - snakePosition[i];
            newSnakePosition.push(nextHeadPosition);
            nextHeadPosition = nextHeadPosition + pos;
        }
        else {
            newSnakePosition.push(snakePosition[i - 1]);
        }
    }
    return newSnakePosition;
}
//function to draw the snake and clearing the game canvas
function draw(snakePosition) {
    for (var i = 0; i < snakePosition.length; i++) {
        var id = snakePosition[i];
        var element = document.getElementById(id.toString());
        if (element)
            element.classList.add("snake-body");
    }
}
function clearCanvas(snakePosition) {
    for (var i = 0; i < snakePosition.length; i++) {
        var id = snakePosition[i];
        var element = document.getElementById(id.toString());
        if (element)
            element.classList.remove("snake-body");
    }
}
//function to manage food stuff
function locateFood(snakePosition) {
    var foodLocation = 0;
    var isFound = false;
    while (!isFound) {
        var food = Math.floor(Math.random() * 100);
        for (var i = 0; i < snakePosition.length; i++) {
            if (food !== snakePosition[i]) {
                isFound = true;
                foodLocation = food;
                break;
            }
        }
    }
    return foodLocation;
}
function displayFood(snakePosition) {
    var location = locateFood(snakePosition);
    var element = document.getElementById(location.toString());
    element.classList.add("food");
}
function eatfood(head) {
    for (var i = 0; i < BOARD_SIZE; i++) {
        var element = document.getElementById(i.toString());
        if (element.classList.contains("food") && i === head) {
            element.classList.remove("food");
            isFoodExist = false;
            score += 1;
            SCORE_BOARD.innerText = score.toString();
            if (snakePosition.length < 7) {
                var size = snakePosition[1] - snakePosition[0];
                var add = snakePosition[snakePosition.length - 1] + size;
                snakePosition.push(add);
            }
        }
    }
}
//check win
function checkwin(head) {
    var deadPositionsEast = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    var deadPositionsWest = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    var deadPositions = 10;
    var element = document.getElementById(head.toString());
    if (!element) {
        IS_PLAYING = false;
    }
    for (var i = 0; i < deadPositions; i++) {
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
    }
    else {
        displayFood(snakePosition);
        isFoodExist = true;
    }
    clearCanvas(snakePosition);
    snakePosition = calculateSnakePosition(snakePosition);
    draw(snakePosition);
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
        if (element.classList.contains("food")) {
            element.classList.remove("food");
        }
    }
    IS_PLAYING = !IS_PLAYING;
    start_btn.classList.add("disabled");
    window.requestAnimationFrame(main);
});
