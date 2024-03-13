// Normal Game
const landingPopupElement = document.querySelector(".play");
const gameMenuElement = document.querySelector(".game-menu");
const gameMenuTitleElement = document.querySelector(".game-menu-title");
const normalFormElement = document.querySelector(".normal-game-form");
const playerSecretNumberInput = document.querySelector(".player-secret-number");
const normalUserEntryPopup = document.querySelector(".normal-user-entry-popup");
const startNormalGamePopup = document.querySelector(".start-normal-game-popup");
const merlinsGuessElement = document.querySelector(".h2-merlins-guess");
const numberOfGuessesElement = document.querySelector(".h3-number-of-guesses");
const endGamePopup = document.querySelector(".end-game-popup");
const endGameMsg1 = document.querySelector(".h2-end-game-msg");
const endGameMsg2 = document.querySelector(".h3-end-game-msg");
const endGameQuitBtn = document.querySelector(".end-game-quit-btn");

// variables
let secretNumber = 0; // stores user's secret number
let smallestNum = 1;
let biggestNum = 100;
let numberOfGuesses = 0;
let currentGuess;

// functions
function createGuess() {
  currentGuess = Math.floor((smallestNum + biggestNum) / 2);
  merlinsGuessElement.innerText = `Is your number ${currentGuess}?`;
  numberOfGuesses++;
  numberOfGuessesElement.innerText = `Number of Guesses: ${numberOfGuesses}`;
}

const GuessEnum = {
  lower: -1,
  correct: 0,
  higher: 1,
};

// called to end game when cheating
function whenCheatingGameIsOver() {
  endGameMsg1.innerText = "Uh Oh!";
  endGameMsg2.innerText = "Crystal Ball Says You're Cheating...";
  startNormalGamePopup.classList.replace("visible", "hidden");
  endGamePopup.classList.replace("hidden", "visible");
}

function isCheating(lastGuess) {
  const isSecretNumberHigherOrEqual = secretNumber >= currentGuess;
  const isSecretNumberLowerOrEqual = secretNumber <= currentGuess;
  if (lastGuess === GuessEnum.lower && isSecretNumberHigherOrEqual) {
    return true;
  } else if (lastGuess === GuessEnum.higher && isSecretNumberLowerOrEqual) {
    return true;
  } else if (lastGuess === GuessEnum.correct && secretNumber !== currentGuess) {
    return true;
  }
  return false;
}

function quitGame(){
  window.location.href = "index.html";
}

//  event listeners
// saves users secret number and starts guessing game
normalFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  secretNumber = parseInt(playerSecretNumberInput.value);
  playerSecretNumberInput.value = "";
  console.log(`secret number stored is ${secretNumber}`);
  normalUserEntryPopup.classList.replace("visible", "hidden");
  startNormalGamePopup.classList.replace("hidden", "visible");
  createGuess();
});
// when user clicks higher btn
document.querySelector(".higher-btn").addEventListener("click", (event) => {
  if (isCheating(GuessEnum.higher)) {
    // stop cheating
    whenCheatingGameIsOver();
    console.error("Crystal Ball says You're cheating!");
    return;
  }
  smallestNum = currentGuess + 1;
  createGuess();
});
// when user clicks lower btn
document.querySelector(".lower-btn").addEventListener("click", (event) => {
  if (isCheating(GuessEnum.lower)) {
    // stop cheating
    whenCheatingGameIsOver();
    console.error("Crystal Ball says You're cheating!");
    return;
  }
  biggestNum = currentGuess - 1;
  createGuess();
});
// when user clicks yes btn
document.querySelector(".correct-btn").addEventListener("click", (event) => {
  if (isCheating(GuessEnum.correct)) {
    // stop cheating
    whenCheatingGameIsOver();
    console.error("Crystal Ball says You're cheating!");
    return;
  }
  startNormalGamePopup.classList.replace("visible", "hidden");
  endGamePopup.classList.replace("hidden", "visible");
});
// when user quites game redirect
document.querySelector(".quit-btn").addEventListener("click", (event) => {
  quitGame();
});
// end Game Popup quit btn
endGameQuitBtn.addEventListener('click', (event) => {
  quitGame();
});

// play again
document.querySelector(".end-game-again-btn").addEventListener('click', (event) => {
  window.location.href = "normal-game.html";
});
