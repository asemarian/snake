const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const newGameButton = document.querySelector("#new-game");
const currentScore = document.querySelector("p");
const eatingSound = new Audio("./audio/eating.wav");
const losingSound = new Audio("./audio/losing.wav");
const newGameSound = new Audio("./audio/newgame.wav");
const cell = 25;
let score = 0, head, food;
let highScore = localStorage.getItem("highScore") || 0;
let direction = "left";
let snake = [
    {
        x: 9 * cell,
        y: 9 * cell
    },
    {
        x: 10 * cell,
        y: 9 * cell
    },
    {
        x: 11 * cell,
        y: 9 * cell
    }
];

document.addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            direction = direction === "right" ? "right" : "left";
            break;
        case 38:
            direction = direction === "down" ? "down" : "up";
            break;
        case 39:
            direction = direction === "left" ? "left" : "right";
            break;
        case 40:
            direction = direction === "up" ? "up" : "down";
            break;
    }
});

const getRandomPosition = () => {
    return {
        x: cell * Math.floor(Math.random() * 20),
        y: cell * Math.floor(Math.random() * 20)
    }
}

const checkSelfCollision = () => {
    if (snake.some(cell => head.x === cell.x && head.y === cell.y)) {
        context.fillStyle = "#00000080";
        context.fillRect(0, 0, 500, 500);
        losingSound.currentTime = 0;
        losingSound.play();
        clearInterval(interval);
    }
}

food = getRandomPosition();

const game = () => {
    // clear screen
    context.fillStyle = "black";
    context.fillRect(0, 0, 500, 500);

    // draw snake
    for (let box of snake) {
        context.fillStyle = "lime";
        context.fillRect(box.x, box.y, cell, cell);
    }

    // draw food
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, cell, cell);

    // change snake head direction
    if (direction === "left") {
        head = {
            x: snake[0].x - cell,
            y: snake[0].y
        }

        if (head.x < 0) {
            head.x = 475;
        }

        checkSelfCollision();

        snake.pop();
        snake.unshift(head);
    }

    if (direction === "right") {
        head = {
            x: snake[0].x + cell,
            y: snake[0].y
        }

        if (head.x === 500) {
            head.x = 0;
        }

        checkSelfCollision();

        snake.unshift(head);
        snake.pop();
    }

    if (direction === "up") {
        head = {
            x: snake[0].x,
            y: snake[0].y - cell
        }

        if (head.y < 0) {
            head.y = 475;
        }

        checkSelfCollision();

        snake.pop();
        snake.unshift(head);
    }

    if (direction === "down") {
        head = {
            x: snake[0].x,
            y: snake[0].y + cell
        }

        if (head.y === 500) {
            head.y = 0;
        }

        checkSelfCollision();

        snake.pop();
        snake.unshift(head);
    }

    // food collision detection 
    if (head.x === food.x && head.y === food.y) {
        snake.push(food)
        food = getRandomPosition();
        score++;
        currentScore.textContent = score > highScore ? `New High Score: ${score}` : `Score: ${score}`;
        highScore = score > highScore ? score : highScore;
        localStorage.setItem("highScore", highScore);
        eatingSound.currentTime = 0;
        eatingSound.play();
    }
}

let interval = setInterval(game, 100);

const newGame = () => {
    newGameSound.currentTime = 0;
    newGameSound.play();
    snake = [
        {
            x: 9 * cell,
            y: 9 * cell
        },
        {
            x: 10 * cell,
            y: 9 * cell
        },
        {
            x: 11 * cell,
            y: 9 * cell
        }
    ];
    direction = "left";
    score = 0;
    currentScore.textContent = "Score: 0";
    food = getRandomPosition();
    clearInterval(interval);
    interval = setInterval(game, 100);
}

newGameButton.addEventListener("click", newGame);