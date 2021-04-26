// ARQUIVO JS DO POPUP




const init = function(){
    //adicionando os event listener
    document.getElementById('botaoReset');
    botaoReset.addEventListener('click', reset);
    document.getElementById('botaoSubmit');
    botaoSubmit.addEventListener('click', send);
}
const reset = function(ev){
}
const send = function(ev){
    
    ev.stopPropagation();
    //fazer apenas o submit
    let fails = validate();
}

function InputCHBX() {
    if(chkCosme.checked && chkDomin.checked && chkCooki.checked) {
        return 1;
        alert("1");
    }
    else if(chkDomin.checked && chkCooki.checked){
        return 2;
        alert("2");
    }
    else if(chkCosme.checked && chkDomin.checked) {
        return 3;
        alert("3");
    }
    else if(chkCosme.checked && chkCooki.checked) {
        return 4;
        alert("4");
    }
    else if(chkDomin.checked){
        return 5;
        alert("5");
    }
    else if(chkCooki.checked){
        return 6;
        alert("6");
    }
    else if(chkCosme.checked) {
        return 7;
        alert("7");
    }

}

validate = function(ev){
    var op=0;
    let chkCosme = document.getElementById('bloqueioCosmetico');
    let chkCooki = document.getElementById('bloqueioCookies');
    let chkDomin = document.getElementById('bloqueioDominio');
    /*  APENAS UM TESTE
    if(chkCosme.checked && chkDomin.checked && chkCooki.checked) {
        op == 1;    
    }
    else if(chkDomin.checked && chkCooki.checked){
        op == 2;  
    }
    else if(chkCosme.checked && chkDomin.checked) {
        op == 3;   
    }
    else if(chkCosme.checked && chkCooki.checked) {
        op == 4;  
    }
    else if(chkDomin.checked){
        op == 5; 
    }
    else if(chkCooki.checked){
        op == 6;  
    }
    else if(chkCosme.checked) {
        op == 7;    
    }
    */

}

//DAR UM JEITO DE FAZER A FUNCAO INPUTCHBX FUNCIONAR NO BACKGROUND

document.addEventListener('DOMContentLoaded', init);