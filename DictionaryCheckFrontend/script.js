const INPUT_TRANSLATE = ".input-translate";
const RESULT_OF_TRANSLATE = ".result";
const INPUT_FILE = ".input__file";
const WORD_FOR_TRANSLATE = ".word-for-translate";
const HELP_WORD = ".help-word";
const ADD_WORD = ".addWord";

let wordforTranslate = document.querySelector(WORD_FOR_TRANSLATE);
let textResult = document.querySelector(RESULT_OF_TRANSLATE);
let textThema = null;
let themaWord = document.querySelector(".thema-word");
let btnCheck = document.querySelector(".check-btn");
const fileSelector = document.querySelector(INPUT_FILE);
let btnStart = document.querySelector(".start-btn");
let btnHelp = document.querySelector(".help-btn");
let helpWordText = null; //Variable for storing the translation value for later display
let helpWord = document.querySelector(HELP_WORD);
let allWords = []; //massiv with 2 words(a word and his translate)
let words = [];
let infoErrFile = document.querySelector(".error-file");
let addWords = document.querySelector(".btn-add-word-form-open");
let transl = document.querySelector(INPUT_TRANSLATE);
let addWordForm = document.querySelector(".forma-add-words ");

const protocol = "http";
const hostName = "localhost";
const port = 5189;
const baseUrl = `${protocol}://${hostName}:${port}`;

addWords.addEventListener("click", () => {

    if (addWordForm.style.display == "block") {
        addWordForm.style.display = "none";
        document.querySelector(ADD_WORD).style.height = "0px";
    } else {
        addWordForm.style.display = "block";
        document.querySelector(ADD_WORD).style.height = "350px";

    }
})


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


//Loads one random word from the database
function loadRandomWord() {

    console.log('wordforTranslate:', wordforTranslate);

    // Send a GET request to the API to get a random word
    axios.get(`${baseUrl}/api/WordAPI`)
        .then(response => {
            console.log("Requested: ", response.data);
            if (wordforTranslate) {
                wordforTranslate.value = response.data.result.textWord;
                helpWordText = response.data.result.translation;
                textThema = response.data.result.theme;
                themaWord.textContent = textThema;
                themaWord.style.visibility = "visible";
            } else {
                console.error('Element with id "wordforTranslate" not found.');
            }
        })
        .catch(error => {
            console.error('Error loading the word:', error);
        });
}

//function shows next word

btnStart.addEventListener("click", () => {

    transl.style.background = "#fff";
    document.querySelector(INPUT_TRANSLATE).value = "";
    textResult.textContent = "";
    helpWord.textContent = "";
    loadRandomWord();
})


//Show the translation if the user doesn't know the word
btnHelp.addEventListener("click", (event) => {
    event.preventDefault(); //This prevents the page from reloading
    if (helpWord && helpWordText) {
        helpWord.textContent = helpWordText;
        helpWord.style.visibility = "visible";
    } else {
        console.warn("Element not found or translation not available.");
    }
})


document.addEventListener("DOMContentLoaded", () => {
    loadRandomWord();
});


//check a translate
btnCheck.addEventListener('click', (event) => {
    event.preventDefault(); //This prevents the page from reloading
    wordforTranslate = document.querySelector(WORD_FOR_TRANSLATE);
    console.log(wordforTranslate.value);
    transl = document.querySelector(INPUT_TRANSLATE);
    console.log(transl.value);

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
                } else {
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
            textResult.style.visibility = "visible";
            transl.style.background = "#FA8072";
            textResult.textContent = "WRONG";
            textResult.style.color = "#FA8072";
        });
});