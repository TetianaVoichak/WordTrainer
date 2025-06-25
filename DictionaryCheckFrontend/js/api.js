const protocol = "http";
const hostName = "localhost";
const port = 5189;
const baseUrl = `${protocol}://${hostName}:${port}`;


//Loads one random word from the database
export function loadRandomWord() {

    let helpWordText = null;
    let wordforTranslate = document.querySelector(".word-for-translate");
    let themaWord = document.querySelector(".thema-word");
    let helpWord = document.querySelector(".help-word");

    console.log('wordforTranslate:', wordforTranslate);

    // Send a GET request to the API to get a random word
    axios.get(`${baseUrl}/api/WordAPI`)
        .then(response => {
            console.log("Requested: ", response.data);
            if (wordforTranslate) {
                wordforTranslate.value = response.data.result.textWord;
                helpWordText = response.data.result.translation;
                helpWord.textContent = helpWordText;
                console.log("helpWord:", helpWordText);
                helpWord.style.visibility = "hidden";
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

export function handleStartClick() {

    let transl = document.querySelector(".input-translate");
    let textResult = document.querySelector(".result");
    let helpWord = document.querySelector(".help-word");
    transl.style.background = "#fff";
    transl.value = "";
    textResult.textContent = "";
    helpWord.textContent = "";
    loadRandomWord();
}


export function handleHelpClick(event) {
    event.preventDefault();
    let helpWord = document.querySelector(".help-word");

    if (helpWord) {
        console.log("helpWord:", helpWord.value);
        helpWord.style.visibility = "visible";
    } else {
        console.warn("Element not found or translation not available.");
    }
}

export function handleCheckClick(event) {
    event.preventDefault();

    let wordforTranslate = document.querySelector(".word-for-translate");
    let transl = document.querySelector(".input-translate");
    let textResult = document.querySelector(".result");

    console.log(wordforTranslate.value);
    console.log(transl.value);

    axios.post(`${baseUrl}/api/WordAPI/check`, {
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
}


import {
    resetInfoAddBlock
} from './ui.js';

export function handleSaveClick(event) {

    event.preventDefault();
    let wordSave = document.querySelector(".word-for-translate-in-forma");
    let translateSave = document.querySelector(".input-translate-in-forma");
    let themeSave = document.querySelector(".input-theme-in-forma");
    let saveWordResult = document.querySelector(".save-word-result");


    axios.post(`${baseUrl}/api/WordAPI/add`, {
        TextWord: wordSave.value,
        Translation: translateSave.value,
        Theme: themeSave.value
    })
        .then(response => {
            console.log("Response:", response.data);
            saveWordResult.textContent = "Successfully.";
            saveWordResult.style.color = "#20B2AA";
            saveWordResult.style.visibility = "visible";
            resetInfoAddBlock();
        })
        .catch(error => {
            console.error('Error saving the word:', error);
            saveWordResult.style.visibility = "visible";
            saveWordResult.textContent = "Error, word not saved.";
            saveWordResult.style.color = "#FA8072";

        });
}