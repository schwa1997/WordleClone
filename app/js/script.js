//detect kayboard
//let letters = [];
const dictionary = ["apple", "schwa", "shine", "hello", "ditch", "rugby"];
document.addEventListener("keydown", (e) => {
  let letters = getLetters();
  let LetterLength = letters.length;
  if (e.key.length === 1 && e.key.match(/[a-z]/i) && letters.length < 5) {
    saveLetters(e.key, LetterLength);
    console.log(letters);
  } else if (e.key === "Enter" && letters.length === 5) {
    console.log("word check");
    checkLetters(letters);
  } else if (e.key === "Backspace") {
    letters = letters.slice(0, -1);
    deleteLetter(letters, LetterLength);
    console.log(letters);
  } else {
    console.log("current guess word is " + letters);
    console.log("current currentGuess Nums is " + LetterLength);
  }
});
const getLetters = () => {
  let inputLetter;
  if (localStorage.getItem("inputLetter") === null) {
    inputLetter = [];
  } else {
    inputLetter = JSON.parse(localStorage.getItem("inputLetter"));
  }
  return inputLetter;
};
//save the letters to the local storage
const saveLetters = (inputData, LetterLength) => {
  const inputLetter = getLetters();
  inputLetter.push(inputData);
  localStorage.setItem("inputLetter", JSON.stringify(inputLetter));
  LetterLength = inputLetter.length;
  updateTiles(LetterLength, inputData);
};

const deleteLetter = (inputLetter, LetterLength) => {
  inputLetter.splice(0, -1);
  localStorage.setItem("inputLetter", JSON.stringify(inputLetter));
  deleteTiles(LetterLength);
};

const updateTiles = (tileNumber, letter) => {
  let currentTile = document.getElementById("guessTile" + tileNumber);
  currentTile.innerText = letter;
};
const deleteTiles = (tileNumber) => {
  let currentTile = document.getElementById("guessTile" + tileNumber);
  currentTile.innerText = null;
};
const checkLetters = (letters) => {
  let sulution = "schwa";
  let checkStatus = ["0", "0", "0", "0", "0"];
  for (var i = 0; i < sulution.length; i++) {
    if (letters[i] === sulution[i]) {
      checkStatus[i] = "1";
      let index = i + 1;
      let currentTile = document.getElementById("guessTile" + index);
      currentTile.classList.add("tile_correct");
    } else if (sulution.includes(letters[i])) {
      checkStatus[i] = "0";
      let index = i + 1;
      let currentTile = document.getElementById("guessTile" + index);
      currentTile.classList.add("tile_present");
    } else {
      checkStatus[i] = "2";
      let index = i + 1;
      let currentTile = document.getElementById("guessTile" + index);
      currentTile.classList.add("tile_absent");
    }
  }
  console.log(checkStatus);
};
