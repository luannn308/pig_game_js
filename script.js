'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const rollEl = document.querySelector('.btn--roll');
const holdEl = document.querySelector('.btn--hold');
const newEl = document.querySelector('.btn--new');

let currentScore, scores, activePlayer, playing;

function init() {
  name0El.textContent = prompt(`Name Player 1 : `);
  name1El.textContent = prompt(`Name Player 2 : `);

  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
}
init();

function checkWin() {
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    playing = false;
    diceEl.classList.add('hidden');
    var sndWin = new Audio('K3RTHA7-game-win-horns.mp3');
    sndWin.play();
  } else changeTurn();
}

function changeTurn() {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
}

function addScore() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    var sndHold = new Audio('mixkit-unlock-game-notification-253.wav');
    sndHold.play();
    checkWin();
  }
}

function addCurrent(score) {
  if (score !== 1) {
    currentScore += score;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    holdEl.addEventListener('click', addScore);
  } else {
    var sndFail = new Audio('104868054.mp3');
    sndFail.play();
    changeTurn();
  }
}

function roll() {
  if (playing) {
    //Roll dice
    let rollDice = Math.trunc(Math.random() * 6) + 1;
    // Display dice
    diceEl.src = `dice-${rollDice}.png`;
    diceEl.classList.remove('hidden');
    // Check dice
    addCurrent(rollDice);
  }
}

rollEl.addEventListener('click', roll);
newEl.addEventListener('click', init);
