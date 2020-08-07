const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");
const startGameButton = document.querySelector("#start");
const newGameButton = document.querySelector("#new-game");

const currentScore = document.querySelector("p");

const cell = 25;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// context.fillStyle = "magenta";
// context.fillRect(9 * cell, 9 * cell, cell, cell);
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



let direction = "left";
document.addEventListener("keydown", ({ keyCode }) => {
    console.log(keyCode);
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
let food = getRandomPosition();
let head;

const endGame = () => {
    if (snake.some(cell => head.x === cell.x && head.y === cell.y)) {
        context.globalAlpha = 0.5;
        ;
        clearInterval(interval);
    }

}

const game = () => {
    // clear screen
    context.fillStyle = "black";
    context.fillRect(0, 0, 500, 500);
    // context.globalAlpha = "0.1"
    // draw snake
    for (let box of snake) {
        context.fillStyle = "lime";
        context.fillRect(box.x, box.y, cell, cell);
    }

    // draw food
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, cell, cell);


    // change snake direction
    if (direction === "left") {
        head = {
            x: snake[0].x - cell,
            y: snake[0].y
        }

        if (head.x < 0) {
            head.x = 475;
        }
        if (snake.some(cell => head.x === cell.x && head.y === cell.y)) {
            context.fillStyle = "#00000080";
            context.fillRect(0, 0, 500, 500)
                ;
            clearInterval(interval);
        }

        // console.log(snake)
        // console.log(head)
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
        if (snake.some(cell => head.x === cell.x && head.y === cell.y)) {
            context.fillStyle = "#00000080";
            context.fillRect(0, 0, 500, 500)
                ;
            clearInterval(interval);
        }
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
        // console.log(head)
        if (snake.some(cell => head.x === cell.x && head.y === cell.y)) {
            context.fillStyle = "#00000080";
            context.fillRect(0, 0, 500, 500)
                ;
            clearInterval(interval);
        }

        snake.pop();
        snake.unshift(head);
        // console.log(snake)

    }

    if (direction === "down") {
        console.log(snake)
        head = {
            x: snake[0].x,
            y: snake[0].y + cell
        }
        if (head.y === 500) {
            head.y = 0;
        }
        if (snake.some(cell => head.x === cell.x && head.y === cell.y)) {
            context.fillStyle = "#00000080";
            context.fillRect(0, 0, 500, 500);
            clearInterval(interval);
        }
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
    }

    // self collision detection 
    // for (let cell of snake) {
    //     if (cell.x === head.x && cell.y === head.y) {
    //         clearInterval(interval);
    //     }
    // }

}

let interval = setInterval(game, 100);
let newInterval;
newGameButton.onclick = () => {
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
    food = getRandomPosition();
    window.location.reload();
}