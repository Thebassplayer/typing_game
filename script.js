const startBtn = document.getElementById("start-button"),
  rulesContainer = document.getElementById("rules-container"),
  word = document.getElementById("word"),
  text = document.getElementById("text"),
  scoreEl = document.getElementById("score"),
  timeEl = document.getElementById("time"),
  endgameContainer = document.getElementById("end-game-container"),
  settingsBtn = document.getElementById("settings-btn"),
  settingsEl = document.getElementById("settings"),
  settingsForm = document.getElementById("settings-form"),
  difficultySelect = document.getElementById("difficulty"),
  reloadBtn = document.getElementById("reload-button"),
  printScore = document.getElementById("print-score"),
  apiURL = "https://random-words-api.vercel.app/word";

let timeInterval,
  randomWord,
  insertedText,
  score = 0,
  time = 10,
  difficulty = localStorage.getItem("difficulty") || "easy";
//! Set difficulty select value
difficultySelect.value = difficulty;

//! Start counting down

function countDown() {
  timeInterval = setInterval(updateTime, 1000);
}

//! Fetch word API
async function getWord() {
  const res = await fetch(apiURL),
    data = await res.json();
  randomWord = await data[0].word;
  addWordToDOM();
}

//! Focus on text on start
text.focus();

//! Add word to DOM
function addWordToDOM() {
  word.innerHTML = randomWord;
}

//! Update Score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

//! Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //! End Game
    gameOver();
  }
}

//! Game Over, Show end Screen
function gameOver() {
  printScore.innerHTML = `
  <p>Your final score is ${score}</p>`;
  endgameContainer.style.display = "flex";
  time = 10;
  timeEl.innerHTML = time + "s";
  scoreEl.innerText = score;
}

//! Event Listeners

//! Start Button
startBtn.addEventListener("click", () => {
  getWord();
  // Hide Start Container
  rulesContainer.style.display = "none";
  // Start counting down
  countDown();
});

//! Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    getWord();
    updateScore();

    //! Clear input
    e.target.value = "";

    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 2;
    }
  }
});

//!Settins btn on click
settingsBtn.addEventListener("click", () => {
  settingsEl.classList.toggle("hide");
});

//! Settings Select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  console.log(difficulty);
  localStorage.setItem("difficulty", difficulty);
});

//! Reload
reloadBtn.addEventListener("click", () => {
  score = 0;
  endgameContainer.style.display = "none";
  countDown();
});
