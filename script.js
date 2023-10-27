'use strict';

const startButton = function () {
    const startButton = document.createElement("button");
    startButton.className = "start-button";
    startButton.innerHTML = `<span class="button-text">GET STARTED</span>`;
    const startdiv = document.getElementById("start");
    startdiv.appendChild(startButton);
    document.querySelector("#cardContainer").style.display = "none";
    startButton.addEventListener("click", () => {
        const audioStartGame = new Audio('./mp3/start_game.mp3');
        audioStartGame.play();
        startGame();
        document.querySelector("#cardContainer").style.display = "grid";
        document.querySelector("#memory-logo").style.display = "none";
        document.querySelector(".container-background").style.display = "block";
        startButton.style.display = "none";
        const timer = document.createElement("p");
        timer.className = "timer";
        timer.textContent = "0:00";
        const timerField = document.getElementById("timer-field");
        timerField.appendChild(timer);
        updateTimer(timer);
    });
};

let seconds = 0;
let minutes = 4;
let hours = 0;

function updateTimer(timer) {
    if (seconds > 0) {
        seconds--;
    } else {
        if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else {
            if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }
        }
    }

    timer.textContent = `Time Left ${minutes.toString().padStart(1, "0")}:${seconds.toString().padStart(2, "0")}`;

    setTimeout(() => updateTimer(timer), 1000);
}

const startGame = function () {
    const values = Array.from({ length: 28 }, (_, index) => Math.floor(index / 2) + 1);
    values.sort(() => Math.random() - 0.5);

    let firstCard = null;
    let secondCard = null;
    let visibleCardCount = 0;
    const matchedCards = {};

    values.forEach(value => {
        const card = document.createElement("div");
        card.className = "card";
        cardContainer.appendChild(card);
        const cardImg = document.createElement("img");
        cardImg.className = "card-img";
        cardImg.src = `images/${value}.png`;
        cardImg.setAttribute("data-value", value);
        card.appendChild(cardImg);
        setTimeout(() => {
            cardImg.style.display = "none";
        }, 3300);

        card.addEventListener("click", () => {
            const audiocardClick = new Audio('./mp3/card_click.wav');
            audiocardClick.play();
            if (!firstCard) {
                firstCard = cardImg;
                cardImg.style.display = "block";
                visibleCardCount++;
            } else if (!secondCard) {
                secondCard = cardImg;
                cardImg.style.display = "block";
                visibleCardCount++;

                setTimeout(() => {
                    if (firstCard.getAttribute("data-value") === secondCard.getAttribute("data-value")) {
                        const audioClickOk = new Audio('./mp3/click_ok.mp3');
                        audioClickOk.play();
                        matchedCards[firstCard.getAttribute("data-value")] = true;
                        matchedCards[secondCard.getAttribute("data-value")] = true;
                    }
                }, 200);
                setTimeout(() => {
                    if (firstCard.getAttribute("data-value") !== secondCard.getAttribute("data-value")) {
                        const audioClickError = new Audio('./mp3/click_error.wav');
                        audioClickError.play();
                        if (!matchedCards[firstCard.getAttribute("data-value")]) {
                            firstCard.style.display = "none";
                        }
                        if (!matchedCards[secondCard.getAttribute("data-value")]) {
                            secondCard.style.display = "none";
                        }
                        visibleCardCount -= 2;
                    }
                    firstCard = null;
                    secondCard = null;
                }, 500);

                if (visibleCardCount === values.length) {
                    setTimeout(() => {
                        const audioFinishGame = new Audio('./mp3/finish_game.mp3');
                        audioFinishGame.play();
                        const gameField = document.getElementById("cardContainer");
                        gameField.style.display = "none";
                        const timerField = document.getElementById("timer-field");
                        timerField.style.display = "none";
                        const finishGame = document.createElement("p");
                        finishGame.className = "finish-game-title";
                        finishGame.textContent = "Congratulations, you won!";
                        const victory = document.getElementById("finish-game");
                        victory.appendChild(finishGame);
                    }, 1000);
                    setTimeout(() => {
                        location.reload();
                    }, 5000);
                }
            }
        });
    });

    const timerTime = 240000;

    setTimeout(() => {
        const audioEndGame = new Audio('./mp3/end_game.mp3');
        audioEndGame.play();
        const gameField = document.getElementById("cardContainer");
        gameField.style.display = "none";
        const timerField = document.getElementById("timer-field");
        timerField.style.display = "none";
        const endGame = document.createElement("p");
        endGame.className = "end-game";
        endGame.innerHTML = "Game over!<br><br> Time's up."
        const badEnd = document.getElementById("bad-end");
        badEnd.appendChild(endGame);
        setTimeout(() => {
            location.reload();
        }, 5000);
    }, timerTime);
}

startButton();
