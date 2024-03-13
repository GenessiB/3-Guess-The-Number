// Reverse Game
const reverseGamePopup = document.querySelector(".reverse-game");
const magicalNumberFormElement = document.querySelector(".magical-number-form");
const userInput = document.querySelector(".users-guess");
const numberOfGuessesElement = document.querySelector(".number-of-guesses");
const endGameQuitBtn = document.querySelector(".end-game-quit-btn");
const endGameMsg1 = document.querySelector(".h2-end-game-msg");
const endGameMsg2 = document.querySelector(".h3-end-game-msg");
const merlinsHintMsg = document.querySelector(".h3-merlins-hint-msg");
const endGamePopup = document.querySelector(".end-game-popup");

//  variables
let merlinsNumber = Math.floor(Math.random() * 100) + 1; // stores merlin's secret number
console.log(merlinsNumber);
let numberOfGuesses = 0;

// functions
function finishedGame() {
  reverseGamePopup.classList.replace("visible", "hidden");
  endGameMsg1.innerHTML = `Congrats! You guessed Merlin's number in ${numberOfGuesses} guesses!`;
  endGameMsg2.innerHTML = "Can you beat your score?";
  endGamePopup.classList.replace("hidden", "visible");
}

function quitGame() {
  window.location.href = "index.html";
}

//   event listeners
magicalNumberFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const userGuess = parseInt(userInput.value);
  numberOfGuesses++;
  numberOfGuessesElement.innerText = `Number of Guesses: ${numberOfGuesses}`;
  userInput.value = "";
  console.log(`your guess is ${userGuess}`);

  if (userGuess === merlinsNumber) {
    finishedGame();
  } else if (userGuess < merlinsNumber) {
    merlinsHintMsg.innerHTML = "Guess Higher!";
  } else if (userGuess > merlinsNumber) {
    merlinsHintMsg.innerHTML = "Guess Lower!";
  }
});

// when user quites game redirect
document.querySelector(".quit-btn").addEventListener("click", (event) => {
  quitGame();
});
// end Game Popup quit btn
endGameQuitBtn.addEventListener("click", (event) => {
  quitGame();
});
// play again
document.querySelector(".end-game-again-btn").addEventListener('click', (event) => {
    window.location.href = "reverse-game.html";
  });
