const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

const cell = 25;

// context.fillStyle = "magenta";
// context.fillRect(9 * cell, 9 * cell, cell, cell);
const snake = [
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

setInterval(() => {

    context.fillStyle = "black";
    context.fillRect(0, 0, 500, 500);
    for (let box of snake) {
        context.fillStyle = "magenta";
        context.fillRect(box.x, box.y, cell, cell);
    }



    if (direction === "left") {
        let head = {
            x: snake[0].x - cell,
            y: snake[0].y
        }

        if (head.x < 0) {
            head.x = 475;
        }

        // console.log(snake)
        // console.log(head)
        snake.pop();

        snake.unshift(head);

    }

    if (direction === "right") {
        let head = {
            x: snake[0].x + cell,
            y: snake[0].y
        }

        if (head.x === 500) {
            head.x = 0;
        }

        snake.unshift(head);
        snake.pop();
    }

    if (direction === "up") {
        let head = {
            x: snake[0].x,
            y: snake[0].y - cell
        }
        if (head.y < 0) {
            head.y = 475;
        }
        // console.log(head)


        snake.pop();
        snake.unshift(head);
        // console.log(snake)

    }

    if (direction === "down") {
        console.log(snake)
        let head = {
            x: snake[0].x,
            y: snake[0].y + cell
        }
        if (head.y === 500) {
            head.y = 0;
        }
        snake.pop();
        snake.unshift(head);
    }

}, 100);