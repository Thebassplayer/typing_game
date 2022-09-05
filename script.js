const word = document.getElementById("word"),
  text = document.getElementById("text"),
  scoreEl = document.getElementById("score"),
  timeEl = document.getElementById("time"),
  endgameEl = document.getElementById("end.game"),
  settingsBtn = document.getElementById("settings.btn"),
  settings = document.getElementById("settings"),
  settingsForm = document.getElementById("settings-form"),
  difficultySelect = document.getElementById("difficulty"),
  apiURL = "https://random-words-api.vercel.app/word";

let randomWord;

//! Fetch word API
async function getWord() {
  const res = await fetch(apiURL),
    data = await res.json();
  randomWord = data[0].word;
}

//! Init score
let score = 0;

//! Init time
let time = 10;

//! Add word to DOM
function addWordToDOM() {
  randomWord = getWord();
}
addWordToDOM();
