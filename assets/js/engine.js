const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifeScore: document.querySelector("#life-score"),
        message: document.querySelector("#message"),
        restart: document.querySelector('.restart'),
        btn: document.getElementById('btn'),
    },
    values : {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        lifes: 5,
        currentTime: 60,
    },
    action: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),
    }

};

function restartGame() {
    btn.addEventListener('click', () => {
        location.reload();
    })
}

function openBtn() {
    state.view.restart.classList.remove("teste");
}

function closeBtn() {
    state.view.restart.classList.add("teste");
}

function clear() {
    clearInterval(state.action.countDownTimeId);
    clearInterval(state.action.timerId);
}

function playSound(nameSound) {
    let audio = new Audio(`./assets/audios/${nameSound}.mp3`);
    audio.volume = 0.4;
    audio.play()
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent =  state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clear();
        openBtn();
        restartGame();
        state.view.message.textContent = `Time is over your score: ${state.values.result}`
        playSound("gameOver");
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("pancada");
            } else {
                if(state.values.lifes > 0){
                    state.values.lifes--
                    playSound("haha")
                    state.view.lifeScore.textContent = `x${state.values.lifes}`;
                    if(state.values.lifes <= 0) {
                        clear();
                        state.view.message.textContent = `Gamer Over: ${state.values.result}`
                        openBtn();
                        restartGame();
                        playSound("gameOver");
                    }
                }
            }
        })
    })
}

function initialize() {
    addListenerHitBox();
};

initialize();