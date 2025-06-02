/*const { default: axios } = require("axios");
/*
class WordTranslate {
  constructor(word, translate) {
    this.word = word;
    this.translate = translate;
  }

  checkWord() {
    let counter = false;
    for (var i = 0; i < allWords.length; i++) {
      if (this.word == "" || this.translate == "") {
        textResult.style.visibility = "visible";
        textResult.textContent = "null";

        return;
      }
      if (
        allWords[i].word.toLowerCase() == this.word.toLowerCase() &&
        allWords[i].translate.toLowerCase() == this.translate.toLowerCase()
      ) {
        textResult.style.visibility = "visible";
        transl.style.background = "#20B2AA";
        textResult.textContent = "RIGHT";
        textResult.style.color = "#20B2AA";
        counter = true;
        return;
      }
    }
    if (!counter) {
      textResult.style.visibility = "visible";
      transl.style.background = "#FA8072";
      textResult.textContent = "WRONG";
      textResult.style.color = "#FA8072";
    }
  }
}
*/

//function a word for translate output

let outputWordForTranslate = function () {

  var index = Math.floor(Math.random() * (words.length - 1) + 1)
  var wordTranslate = words[index];
  console.log(wordTranslate);
  return wordTranslate;
}
//show word if you dont know translate
function showRightWord(word) {
  for (var i = 0; i < allWords.length; i++) {
    if (word == allWords[i].word) {
      helpWord.style.visibility = "visible";
      helpWord.textContent = allWords[i].translate;
      return;
    }
  }

}

let randWord = function () {
  let index = Math.floor(Math.random() * allWords.length);
  return allWords[index].word;
}

//remember all words for a translation
let rememberAllWordsForATranslation = function () {
  for (var i = 0; i < allWords.length; i++) {
    var index = Math.floor(Math.random() * (allWords.length - 1) + 1);
    words[i] = allWords[index].translate;
    allWords[index].translate = allWords[i].translate;
    allWords[i].translate = words[i];
  }
}

const INPUT_TRANSLATE = ".input-translate";
const RESULT_OF_TRANSLATE = ".result";
const INPUT_FILE = ".input__file";
const WORD_FOR_TRANSLATE = ".word-for-translate";
const HELP_WORD = ".help-word";
const ADD_WORD = ".addWord";

let wordforTranslate = document.querySelector(WORD_FOR_TRANSLATE);
let textResult = document.querySelector(RESULT_OF_TRANSLATE);
let btnCheck = document.querySelector(".check-btn");
const fileSelector = document.querySelector(INPUT_FILE);
let btnStart = document.querySelector(".start-btn");
let btnHelp = document.querySelector(".help-btn");
let helpWord = document.querySelector(HELP_WORD);
let allWords = []; //massiv with 2 words(a word and his translate)
let words = [];
let infoErrFile = document.querySelector(".error-file");
let moreInfo = document.querySelector(".btn-add-word-form-open");
let transl = document.querySelector(INPUT_TRANSLATE);


const protocol = "http";
const hostName = "localhost";
const port = 5189;
const baseUrl = `${protocol}://${hostName}:${port}`;

moreInfo.addEventListener("click", () => {
  let addWordForm = document.querySelector(".forma-add-words ");

  //let textBtnAddWord = document.querySelector(".btn-add-word-form-open");

  if (addWordForm.style.visibility == "visible") {
    addWordForm.style.visibility = "hidden";
    //textBtnInstr.textContent = "Instruction click here";
    document.querySelector(ADD_WORD).style.height = "0px";


  } else {
    addWordForm.style.visibility = "visible";
    //textBtnInstr.textContent = "Hide information";
    document.querySelector(ADD_WORD).style.height = "300px";
  }
})

//check word with translate
/*
btnCheck.addEventListener("click", () => {
  let firstWord = document.querySelector(WOLD_FOR_TRANSLATE).value;
  let ansverWord = document.querySelector(INPUT_TRANSLATE).value;
  let words = new WordTranslate(firstWord, ansverWord);
  words.checkWord();
});*/

// Function to display error message
function showError(message) {
  infoErrFile.textContent = message;
  infoErrFile.style.visibility = "visible";
}


// Function to reset the error message
function resetError() {
  infoErrFile.textContent = "";
  infoErrFile.style.visibility = "hidden";
}

//reset information from previous file
function resetInfoFromPreviousFile() {
  allWords.length = 0;
  document.querySelector(WORD_FOR_TRANSLATE).value = "";
  document.querySelector(INPUT_TRANSLATE).value = "";
  document.querySelector(HELP_WORD).textContent = "";
  document.querySelector(RESULT).textContent = "";
}


//select a file and load info from this file

fileSelector.addEventListener("change", (event) => {
  const fileWithWords = event.target.files;
  if (fileWithWords.length === 0) {
    showError("No file selected");
    resetInfoFromPreviousFile();
    return;
  }
  let file = fileWithWords[0];

  // Check file type
  if (file.type !== "text/plain") {
    showError("Please upload a valid .txt file");
    resetInfoFromPreviousFile();
    return;
  }

  file = document.querySelector(INPUT_FILE).files[0];
  let reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = function () {
    resetError();
    let str = reader.result;

    document.querySelector(INPUT_TRANSLATE).value = "";
    document.querySelector(HELP_WORD).textContent = "";
    document.querySelector(RESULT).textContent = "";

    // Check file format before loading into array
    if (!validateFileContent(str)) {
      showError("Invalid file format");
      resetInfoFromPreviousFile();
      return;
    }

    funcPutWordsFromFileInVariable(str);
    wordforTranslate.value = randWord();

  }
  reader.onerror = function () {
    showError("File upload error");
    resetInfoFromPreviousFile();
    console.log(reader.error);

  }
});


/* Function to check the file format.
 * Returns true if the format is correct, otherwise false.
 */

const validateFileContent = str => str.split("\n").every(line => line.includes(" - "));


//write info from file in a massiv with words

let funcPutWordsFromFileInVariable = function (str) {
  allWords.length = 0;
  let strSplit = str.split('\n');
  for (var i = 0; i < strSplit.length; i++) {
    let temp = strSplit[i].split(' - ');
    let coupleWords = new WordTranslate();
    coupleWords.translate = temp[0];
    coupleWords.word = temp[1].split('\r')[0];
    allWords.push(coupleWords);
  }
}

transl.addEventListener("click", () => {
  document.querySelector(INPUT_TRANSLATE).value = "";
  transl.style.background = "#fff";
})

//function shows next word

btnStart.addEventListener("click", () => {
  transl.style.background = "#fff";
  document.querySelector(INPUT_TRANSLATE).value = "";
  textResult.textContent = "";
  helpWord.textContent = "";
  wordforTranslate.value = randWord();
})

//show word if you dont know his translate
btnHelp.addEventListener("click", () => {
  showRightWord(document.querySelector(WORD_FOR_TRANSLATE).value)
})
/*
//Load the word from the API and insert it into the input when the page loads
document.addEventListener("DOMContentLoaded", () => {

  // Send a GET request to the API to get a random word
  fetch('http://localhost:5000/api/word')
    .then(response => response.json())// Convert the response to JSON
    .then(data => {
      // Insert the received word into the input field with id="wordInput"
      document.getElementById('wordInput').value = data.word;
    })
    .catch(error => {
      console.error('Error loading the word:', error);
    });
});
*/

document.addEventListener("DOMContentLoaded", () => {


  console.log('wordforTranslate:', wordforTranslate);

  // Send a GET request to the API to get a random word
  axios.get(`${baseUrl}/api/WordAPI`)
    .then(response => {
      console.log("Requested: ", response.data);
      if (wordforTranslate) {
        wordforTranslate.value = response.data.result.textWord;

      } else {
        console.error('Element with id "wordforTranslate" not found.');
      }
    })
    .catch(error => {
      console.error('Error loading the word:', error);
    });
});


//check a translate
btnCheck.addEventListener('click', (event) => {
  event.preventDefault();//This prevents the page from reloading
  wordforTranslate = document.querySelector(WORD_FOR_TRANSLATE);
  console.log(wordforTranslate.value);
  transl = document.querySelector(INPUT_TRANSLATE);
  console.log(transl.value);
  //btnCheck = document.querySelector(".check-btn");
  //send a POST request to the API to send a translate

  axios.post(`${baseUrl}/api/WordAPI/check`, {
    // data to send to server
    Translation: transl.value,
    TextWord: wordforTranslate.value
  })
    .then(response => {
      console.log("Response:", response.data);
      if (response.data && response.data.result) {
        console.log("Is the translation correct?:", response.data.result.correct);
        const isCorrect = response.data.result.correct;
        const message = response.data.result.message;
        if (isCorrect) {
          textResult.style.visibility = "visible";
          transl.style.background = "#20B2AA";
          textResult.textContent = message;
          textResult.style.color = "#20B2AA";
        }
        else {
          textResult.style.visibility = "visible";
          transl.style.background = "#FA8072";
          textResult.textContent = message;
          textResult.style.color = "#FA8072";
        }

      } else {
        textResult.textContent = "Unexpected server response.";
      }

    })
    .catch(error => {
      console.error('Error sending translation:', error);
      textResult.textContent = "Error sending translation.";
    });
});