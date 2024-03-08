const yesBtnElement = document.querySelector(".yes-btn");
const landingPopupElement = document.querySelector(".play");
const gameMenuElement = document.querySelector(".game-menu");


// Events
function readyToPlay() {
    landingPopupElement.classList.replace("visible", "hidden");
    gameMenuElement.classList.replace("hidden", "visible");
    }

// Event Listeners
yesBtnElement.addEventListener("click", readyToPlay);
