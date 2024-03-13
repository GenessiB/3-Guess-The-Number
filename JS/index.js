const yesBtnElement = document.querySelector(".yes-btn");
const landingPopupElement = document.querySelector(".play");
const gameMenuElement = document.querySelector(".game-menu");
const gameMenuTitleElement = document.querySelector(".game-menu-title");

const normalGamePopupElement = document.querySelector(".normal-game");
const normalGameBtnElement = document.querySelector(".normal-btn");


const reverseGamePopupElement = document.querySelector(".reverse-game");
const reverseGameBtnElement = document.querySelector(".reverse-btn");

const instructionsBtnElement = document.querySelector(".instructions");
const instructionsPopupElement = document.querySelector(".instructions-popup");
const closeSealBtnElement = document.querySelector(".close-seal");


// 


// Events
function readyToPlay() {
  landingPopupElement.classList.replace("visible", "hidden");
  gameMenuElement.classList.replace("hidden", "visible");
  gameMenuTitleElement.classList.replace("hidden", "visible");
}
// opens and closes the instructions/hint
function seeInstructions() {
  gameMenuElement.classList.replace("visible", "hidden");
  gameMenuTitleElement.classList.replace("visible", "hidden");
  instructionsPopupElement.classList.replace("hidden", "visible");
}
function closeInstructions() {
  instructionsPopupElement.classList.replace("visible", "hidden");
  gameMenuElement.classList.replace("hidden", "visible");
  gameMenuTitleElement.classList.replace("hidden", "visible");
}

// Event Listeners
yesBtnElement.addEventListener("click", readyToPlay);
instructionsBtnElement.addEventListener("click", seeInstructions);
closeSealBtnElement.addEventListener("click", closeInstructions);

