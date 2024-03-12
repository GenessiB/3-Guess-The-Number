 const readline = require("readline");
 const rl = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// ----- utility functions 🛠️ ------->

// function getNumberFromQuestion (question as a string) then return a number
async function getNumberFromQuestion(question) {
  let numFromAnswer = await ask(question);
  numFromAnswer = Number(numFromAnswer);
  if (isNumInvalid(numFromAnswer)) {
    return getNumberFromQuestion(question);
  } else {
    return numFromAnswer;
  }
}

async function isPlayingAgain() {
  let playingAgainResponse = await ask(
    "Would you like to play again? (yes or no) >"
  );
  if (playingAgainResponse === "yes") {
    return true;
  }
  return false;
}

function isNumInvalid(number) {
  return Number.isNaN(number);
}

//* --- functions for Normal Game --->

// L OR H as return
async function getLowerHigherAnswer() {
  let higherLowerAnswer = await ask(
    "Is your number Higher (H) or Lower (L)? >"
  );

  higherLowerAnswer = higherLowerAnswer.toLowerCase();

  if (
    higherLowerAnswer === "lower" ||
    higherLowerAnswer === "l" ||
    higherLowerAnswer === "higher" ||
    higherLowerAnswer === "h"
  ) {
    return higherLowerAnswer;
  } else {
    console.error(
      "Invalid input. Please type whether your number is Higher, H, Lower or L."
    );
    return getLowerHigherAnswer();
  }
}

//askingQuestion("question (yes or no)")
async function askingQuestion(question) {
  let answer = await ask(question);
  answer = answer.toLowerCase();
  if (answer === "yes") {
    return true; // i found the number
  } else if (answer === "no") {
    return false; // still searching the number
  } else {
    console.error("Input must only be yes or no.");
    return await askingQuestion(question); // i have to define question in the loop
  }
}

//? ------------ Start of Normal Game ------------------------>

/** computer is guessing the user's input.
 * async (asynchronous function that will be executed at some point "under the hood", we don't know when or how long it will take to execute)
 */
async function normalGame(maxRange) {
  console.log(
    "Let's play the Normal game where you (human) make up a number and I (computer) try to guess it."
  );
  // my guess range for the numbers.
  let smallestNum = 1;
  let biggestNum = maxRange;
  let incorrectGuess = true;
  let numOfGuesses = 0;
  let userInputNum = await ask(
    "What is your secret number?\nI won't peek, I promise... >\n"
  );
  userInputNum = Number(userInputNum);
  if (isNumInvalid(userInputNum)) {
    normalGame();
    // Ill be back later
    return; // a return with nothing is an exit return
  }
  console.log("You entered: " + userInputNum);

  while (incorrectGuess) {
    numOfGuesses++;
    let computerGuess =
      biggestNum === smallestNum
        ? biggestNum
        : Math.floor((biggestNum + smallestNum) / 2); // incase min and max num are the same (0 divided by 2 is not in our range)
    let isCompGuessCorrect = await askingQuestion(
      `Is your number ${computerGuess}? (yes or no) >`
    );

    if (isCompGuessCorrect) {
      incorrectGuess = false;
      console.log(
        `Your number was ${computerGuess}! I got it in ${numOfGuesses} tries.`
      );
    } else {
      let higherLowerAnswer = await getLowerHigherAnswer(); // lower l higher h
      if (higherLowerAnswer === "lower" || higherLowerAnswer === "l") {
        // lower - decrease the maximum to computerGuess - 1
        biggestNum = computerGuess - 1;
      } else {
        smallestNum = computerGuess + 1;
        //higher - increase the minimum to computerGuess + 1
      }
    }
  }
}
// -------------------------------- End of Normal Game -----------------------------

//* --- functions for reverse game --->

//? --------------------------- Start of Reverse Game ------------------------------->
/** user is guessing the computer's number. */
async function reverseGame(maxRange) {
  console.log(
    "Let's play the Reverse game where you (human) are guessing my (computer) Number."
  );
  const theComputersNum = Math.floor(Math.random() * maxRange) + 1;
  let numberOfGuesses = 0;
  let incorrectGuess = true;
  while (incorrectGuess) {
    // ask a number from the user
    numberOfGuesses++;
    let userNum = await getNumberFromQuestion("Guess my number? >");
    /***
     * three cases:
     * if      | 1st: the value of the user is matching the computers number (found the number) winning, stop condition */
    if (theComputersNum === userNum) {
      incorrectGuess = false;
      console.log(
        `My number was ${userNum}! You got it in ${numberOfGuesses} tries.`
      );
    }
    // else if | 2nd: the number from the user is > than the computer (the computer tells the user to go lower)
    else if (userNum > theComputersNum) {
      console.log("Nope! Try guessing lower.");
    }
    // else    | 3rd: the number from the user is < than the computer (the computer tells the user to go higher)
    else {
      console.log("Not quite right. Try guessing higher.");
    }
  }
}

// ------------------------- End of Reverse Game ----------------------------------

//! --- Quit --->
/** the quit function will basically stop everything and close it. */
function quit() {
  console.log("Good Bye!");
  rl.close(); // since we're done with the console we I'm closing the metaphorical bridge.
  process.exit();
}
// ---------------------------------------------------------------------------------------

//? --- Game Greeting & Menu Options --->
/**
 * ask the player to choose what game to play
 */
async function start() {
  let isPlaying = true;
  while (isPlaying) {
    // We ask the user what game they wanna play
    let userGameChoice = await ask(
      "Welcome to Guess The Number!\n What game would you like to play?\n Options:\n • Normal\n • Reverse\n • Quit Game\n > "
    );
    userGameChoice = userGameChoice.toLowerCase();
    console.log(userGameChoice);
    // 1: Normal
    if (userGameChoice === "normal") {
      const customRange = await getNumberFromQuestion(
        "Input your Maximum range for the game. (Recommended Max is 100) >"
      );
      if (customRange < 1) {
        console.error("Input should be greater than 1.");
        continue;
      } else if (!Number.isInteger(customRange)) {
        console.error("Input needs to be a whole Number.");
        continue;
      }
      await normalGame(customRange);
    }
    // 2: Reverse
    else if (userGameChoice === "reverse") {
      const customRange = await getNumberFromQuestion(
        "Input your Maximum range for the game. (Recommended Max is 100) >"
      );
      if (customRange < 1) {
        console.error("Input should be greater than 1.");
        continue;
      } else if (!Number.isInteger(customRange)) {
        console.error("Input needs to be a whole Number.");
        continue;
      }
      await reverseGame(customRange);
    }
    // 3: Quit
    else if (userGameChoice === "quit game" || userGameChoice === "quit") {
      quit();
    }
    // Anything else we tell the user is not valid and We ask the user what game they wanna play again
    else {
      console.error(
        "Input is invalid, please choose Normal, Reverse, or Quit Game.\n"
      );
      start();
    }
    isPlaying = await isPlayingAgain();
  }
  quit();
}

start();
