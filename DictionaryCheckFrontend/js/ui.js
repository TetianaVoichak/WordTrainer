export function handleAddWordsAreaClick() {
    let addWordForm = document.querySelector(".forma-add-words");
    let addWordBlock = document.querySelector(".addWord");
    let formTranslate = document.querySelector(".forma-translate");
    let saveWordResultEl = document.querySelector(".save-word-result");

    if (!addWordForm || !addWordBlock || !formTranslate || !saveWordResultEl) {
        console.warn("One of the elements was not found.");
        return;
    }

    if (addWordForm.style.display == "block") {
        addWordForm.style.display = "none";
        addWordBlock.style.height = "0px";
        formTranslate.style.marginTop = "0px";
        resetInfoAddBlock();
        saveWordResultEl.textContent = "";
    } else {
        addWordForm.style.display = "block";
        addWordBlock.style.height = "370px";
        document.querySelector(".forma-translate").style.marginTop = "30px";
        saveWordResultEl.style.visibility = "hidden";
        saveWordResultEl.textContent = "";
    }
}

//remove information from fields in the add word block
export function resetInfoAddBlock() {
    let wordSave = document.querySelector(".word-for-translate-in-forma").value = "";
    let translateSave = document.querySelector(".input-translate-in-forma").value = "";
    let themeSave = document.querySelector(".input-theme-in-forma").value = "";
}

export function handleTranslateClick(transl) {
    if (!transl) return;
    transl.value = "";
    transl.style.background = "#fff";
}