// function to create keyboard buttons
// generate random word from word list array
// function to create word letters
// handle reset game (play again)
// handle image change
//handle correct answers or wrong answers

const keyboard = document.querySelector(".keyboard");
const guesssText = document.querySelector(".guesses-text b");
const hintText = document.querySelector(".hint-text");
const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

//generate random word
let currentWord;
let wrongGuessCounter = 0;
let correctGuessCounter = [];

const MAX_GUESSES = 6;

const gameOver = (status) => {
  const condition = status === "Success";
  gameModal.classList.remove("hide");

  gameModal.querySelector("img").src = `../images/${condition ? "victory" : "lost"}.gif`;
  gameModal.querySelector("h4").innerHTML = condition ? "Congratulations" : "Game over!";
  gameModal.querySelector("p").innerHTML = condition
    ? `You solved it the word  <strong>${currentWord}</strong>`
    : `Sorry the word was <strong>${currentWord}</strong>`;
};

//handle compare clicked letter with word letters
const startGame = (clickedBtn, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctGuessCounter.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCounter++;
    guesssText.innerHTML = `${wrongGuessCounter} / ${MAX_GUESSES}`;
    hangmanImage.src = `../images/hangman-${wrongGuessCounter}.svg`;
  }

  clickedBtn.disabled = true;

  if (correctGuessCounter.length === currentWord.length) return gameOver("Success");

  if (wrongGuessCounter === MAX_GUESSES) return gameOver("faild");
};

// reset all game options
const resetGame = () => {
  wrongGuessCounter = 0;
  hangmanImage.src = `../images/hangman-${wrongGuessCounter}.svg`;
  guesssText.innerHTML = `${wrongGuessCounter} / ${MAX_GUESSES}`;

  keyboard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  console.log(currentWord);

  wordDisplay.innerHTML = currentWord
    .split("")
    .map((_) => `<li class="letter"></li>`)
    .join("");

  gameModal.classList.add("hide");
};

//generate random word
const generateRandomWord = () => {
  const { hint, word } = wordList[Math.floor(Math.random() * wordList.length)];

  currentWord = word;
  hintText.innerHTML = hint;

  resetGame();
};

// generate keyboard buttons
function generateKeboard() {
  for (let i = 97; i < 123; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);

    button.addEventListener("click", (e) => startGame(e.target, String.fromCharCode(i)));
    keyboard.appendChild(button);
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    playAgainBtn.click();
  }
  document.querySelectorAll("button").forEach((btn) => {
    if (btn.innerHTML === e.key) {
      btn.click();
    }
  });
});

playAgainBtn.addEventListener("click", () => generateRandomWord());

generateKeboard();
generateRandomWord();
