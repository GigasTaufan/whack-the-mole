const ground = document.querySelectorAll('.ground');
const mole = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score-board');
const pop = document.querySelector('#pop');

let groundBefore;
let finish;
let score;

function randomGround(ground) {
    const t = Math.floor(Math.random() * ground.length);
    const tRandom = ground[t];
    if (tRandom == groundBefore) {
        randomGround(ground);
    }
    groundBefore = tRandom;
    return tRandom;
}

function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function appearTheMole() {
    const tRandom = randomGround(ground);
    const timeRandom = randTime(300, 1000);
    tRandom.classList.add('appear');
    setTimeout(() => {
        tRandom.classList.remove('appear');
        if (!finish) {
            appearTheMole();
        }
    }, timeRandom);
}

function play() {
    finish = false;
    score = 0;
    scoreBoard.textContent = score;
    appearTheMole(ground);
    setTimeout(() => {
        finish = true;
    }, 10000);
}

function beat() {
    score++;
    this.parentNode.classList.remove('appear');
    pop.play();
    scoreBoard.textContent = score;
}

mole.forEach(t => {
    t.addEventListener('click', beat);
});