
const { createGameState, gameLoop } = require('./game');
const { FRAME_RATE } = require('./constants');

const io = require("socket.io")();

//io.origins(["http://127.0.0.1:8080/"]);

//io.withCredentials(true)

io.on("connection", client => {
    const state = createGameState();

    startGameInterval(client, state);
});

function startGameInterval(client, state) {
    const intervalId = setInterval(() => {
        const winner = gameLoop(state);

        if (!winner) {
            client.emit('gameState', JSON.stringify(state));
        } else {
            client.emit('gameOver');
            clearInterval(intervalId);
        }
    }, 1000/FRAME_RATE);
}

io.listen(8080);