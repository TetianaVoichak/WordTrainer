import {
    loadRandomWord
} from "./api.js";
import {
    handleStartClick
} from "./api.js";
import {
    handleHelpClick
} from './api.js';
import {
    handleCheckClick
} from "./api.js";
import {
    handleSaveClick
} from "./api.js";

import {
    handleAddWordsAreaClick
} from "./ui.js";


import {
    handleTranslateClick
} from "./ui.js";
document.addEventListener("DOMContentLoaded", () => {
    loadRandomWord();

    let btnStart = document.querySelector(".start-btn");
    btnStart.addEventListener("click", handleStartClick);

    const helpBtn = document.querySelector(".help-btn");
    helpBtn.addEventListener("click", handleHelpClick);

    let btnCheck = document.querySelector(".check-btn");
    btnCheck.addEventListener("click", handleCheckClick);

    let btnSave = document.querySelector(".save-word-btn");
    btnSave.addEventListener("click", handleSaveClick);

    let addWords = document.querySelector(".btn-add-word-form-open");
    addWords.addEventListener("click", handleAddWordsAreaClick);
    let transl = document.querySelector(".input-translate");
    transl.addEventListener("click", () => handleTranslateClick(transl));

});