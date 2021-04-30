// ARQUIVO JS DO POPUP
//variáveis
let checkBox;
let checkboxCosmetico;
let checkboxCookies;
let checkboxDominio;

//função para o botão de salvar as opções para desativar os bloqueios
function init() {
    checkboxCosmetico = document.getElementById('bloqueioCosmetico').checked;
    checkboxCookies = document.getElementById('bloqueioCookies').checked;
    checkboxDominio = document.getElementById('bloqueioDominio').checked;
    checkBox = InputCHBX(checkboxCosmetico,checkboxCookies,checkboxDominio);
    chrome.runtime.sendMessage(
        {greeting: JSON.stringify(checkBox)}
    )
}

//função para reset das opções
function reset(){
    checkboxCosmetico = false;
    checkboxCookies = false;
    checkboxDominio = false;
    checkBox = InputCHBX(checkboxCosmetico,checkboxCookies,checkboxDominio);
    chrome.runtime.sendMessage(
        {greeting: JSON.stringify(checkBox)}
    )
}

//função para o envio das respostas
function InputCHBX(checkboxCosmetico,checkboxCookies,checkboxDominio) {
    if(checkboxCosmetico == true && checkboxDominio == true && checkboxCookies == true) {
        return 1;
    }
    else if(checkboxDominio == true && checkboxCookies == true ){
        return 2;
    }
    else if(checkboxCosmetico == true && checkboxDominio == true ) {
        return 3;
    }
    else if(checkboxCosmetico == true && checkboxCookies == true ) {
        return 4;
    }
    else if(checkboxDominio == true ){
        return 5;
    }
    else if(checkboxCookies == true ){
        return 6;
    }
    else if(checkboxCosmetico == true ) {
        return 7;
    }
    else {
        return 0;
    }
}

//função para adicionar a um blocklist ou whitelist
function whiteBlockList() {
    let block = document.getElementById("whiteBlockList").value;
    if (block == "whiteList") {
        chrome.runtime.sendMessage(
            {greeting: JSON.stringify("whiteList")}
        )
    } else if (block == "blockList") {
        chrome.runtime.sendMessage(
            {greeting: JSON.stringify("blockList")}
        )
    } else if (block == "addFav") {
        chrome.runtime.sendMessage(
            {greeting: JSON.stringify("addFav")}
        )
    }
}

//listeners de execução dos botões
document.getElementById("botaoWhiteBlocklist").addEventListener('click', whiteBlockList);
document.getElementById("botaoSubmit").addEventListener('click', init);
document.getElementById("botaoReset").addEventListener('click', reset);
