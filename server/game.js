const { GRID_SIZE } = require('./constants');

module.exports = {
    createGameState,
    gameLoop
}

function createGameState () {
    return {
        player: {
          pos: {
            x: 3,
            y: 10,
          },
          vel: {
            x: 1,
            y: 0,
          },
          snake: [
            {x: 1, y: 10},
            {x: 2, y: 10},
            {x: 3, y: 10},
          ],
        },
        food: {
            x: 7,
            y: 7
        },
        gridsize: GRID_SIZE,
        active: true
    };
}

function gameLoop(state) {
    if (!state) {
        return;
    }

    const playerOne = state.player;

    playerOne.position.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;

    if(playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
        return 2;
    }

    if (state.food.x === player.position.x && state.food.y === player.position.y){
        playerOne.snake.push({...playerOne.pos});
        playerOne.position.x += playerOne.vel.x;
        playerOne.pos.y += playerOne.vel.y;
        randomFood(state);
    }

    if (playerOne.vel.x || playerOne.vel.y) {
        for (let cell of playerOne.snake) {
            if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
                return 2
            }
        }

        playerOne.snake.push({...playerOne.position});
        playerOne.snake.shift();
    }

    return false;
}

function randomFood(state) {
    food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    }

    for (let cell of state.player.snake) {
        if (cell.x === food.x && cell.y === food.y) {
            return randomFood(state)
        }
    }

    state.food = food;
}