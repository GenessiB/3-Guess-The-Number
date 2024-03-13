// Normal Game
const normalFormElement = document.querySelector(".normal-game-form");
const playerSecretNumberInput = document.querySelector(".player-secret-number");
const normalUserEntryPopup = document.querySelector(".normal-user-entry-popup");
const startNormalGamePopup = document.querySelector(".start-normal-game-popup");
const merlinsGuessElement = document.querySelector(".h2-merlins-guess");
const numberOfGuessesElement = document.querySelector(".h3-number-of-guesses");

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

function isCheating(lastGuess) {
  const isSecretNumberHigherOrEqual = secretNumber >= currentGuess;
  const isSecretNumberLowerOrEqual = secretNumber <= currentGuess;
  if (lastGuess === GuessEnum.lower && isSecretNumberHigherOrEqual) {
    return true;
  } else if (lastGuess === GuessEnum.higher && isSecretNumberLowerOrEqual) {
    return true;
  } else if (lastGuess === GuessEnum.correct && secretNumber !== currentGuess) {
    // you understand ? i think i sdo
    return true;
  }
  // if you're clicking equal but I'm not
  return false;
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
    // you mofo stop cheating
    console.error("You're cheating !!!");
    return;
  }
  smallestNum = currentGuess + 1;
  createGuess();
});
// when user clicks lower btn
document.querySelector(".lower-btn").addEventListener("click", (event) => {
  if (isCheating(GuessEnum.lower)) {
    // you mofo stop cheating
    console.error("You're cheating !!!");
    return;
  }
  biggestNum = currentGuess - 1;
  createGuess();
});
// when user clicks yes btn
document.querySelector(".correct-btn").addEventListener("click", (event) => {
  if (isCheating(GuessEnum.correct)) {
    // you mofo stop cheating
    console.error("You're cheating !!!");
    return;
  }
  startNormalGamePopup.classList.replace("visible", "hidden");
  document
    .querySelector(".end-game-popup")
    .classList.replace("hidden", "visible");
});
// when user quites game redirecy
document.querySelector(".quit-btn").addEventListener("click", (event) => {
  window.location.href = "index.html";
});

// need to figure out a way to prevent it from continuing letting player guess when the secretynuber has been passed
