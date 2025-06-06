const INPUT_TRANSLATE = ".input-translate";
const RESULT_OF_TRANSLATE = ".result";
const WORD_FOR_TRANSLATE = ".word-for-translate";
const HELP_WORD = ".help-word";
const ADD_WORD = ".addWord";

let wordforTranslate = document.querySelector(WORD_FOR_TRANSLATE);
let textResult = document.querySelector(RESULT_OF_TRANSLATE);
let themaWord = document.querySelector(".thema-word");

let btnCheck = document.querySelector(".check-btn");
let btnStart = document.querySelector(".start-btn");
let btnHelp = document.querySelector(".help-btn");
let btnSave = document.querySelector(".save-word-btn");

let wordSave = null;
let translateSave = null;
let themeSave = null;

let helpWordText = null; //Variable for storing the translation value for later display
let saveWordResult = document.querySelector(".save-word-result");
let helpWord = document.querySelector(HELP_WORD);


let addWords = document.querySelector(".btn-add-word-form-open");
let transl = document.querySelector(INPUT_TRANSLATE);
let addWordForm = document.querySelector(".forma-add-words ");

const protocol = "http";
const hostName = "localhost";
const port = 5189;
const baseUrl = `${protocol}://${hostName}:${port}`;

//Opening an area for adding a word
addWords.addEventListener("click", () => {

    if (addWordForm.style.display == "block") {
        addWordForm.style.display = "none";
        document.querySelector(ADD_WORD).style.height = "0px";
        document.querySelector(".forma-translate").style.marginTop = "0px";
        resetInfoAddBlock();
    } else {
        addWordForm.style.display = "block";
        document.querySelector(ADD_WORD).style.height = "370px";
        document.querySelector(".forma-translate").style.marginTop = "30px";
    }
})



//remove information from fields in the add word block
function resetInfoAddBlock() {

    wordSave = document.querySelector(".word-for-translate-in-forma").value = "";
    translateSave = document.querySelector(".input-translate-in-forma").value = "";
    themeSave = document.querySelector(".input-theme-in-forma").value = "";
}


//reset information from previous file
function resetInfoFromPreviousFile() {
    document.querySelector(WORD_FOR_TRANSLATE).value = "";
    document.querySelector(INPUT_TRANSLATE).value = "";
    document.querySelector(HELP_WORD).textContent = "";
    document.querySelector(RESULT).textContent = "";
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
                themaWord.textContent = response.data.result.theme;
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



//send word to server

btnSave.addEventListener('click', (event) => {
    event.preventDefault(); //This prevents the page from reloading
    wordSave = document.querySelector(".word-for-translate-in-forma");
    translateSave = document.querySelector(".input-translate-in-forma");
    themeSave = document.querySelector(".input-theme-in-forma");

    //send a POST request
    axios.post(`${baseUrl}/api/WordAPI/add`, {
        // data to send to server
        TextWord: wordSave.value,
        Translation: translateSave.value,
        Theme: themeSave.value
    })
        .then(response => {
            console.log("Response:", response.data);
            saveWordResult.textContent = "Successfully.";
            saveWordResult.style.visibility = "visible";
            resetInfoAddBlock();
        })
        .catch(error => {
            console.error('Error saving the word:', error);
            saveWordResult.textContent = "Error, word not saved.";
            saveWordResult.style.color = "#FA8072";
            saveWordResult.style.visibility = "visible";
        });
})