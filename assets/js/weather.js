const content = document.querySelector(".content"),
inputPart = content.querySelector(".input__part"),
infoTxt = content.querySelector(".info__text"),
inputField = content.querySelector("input");

inputField.addEventListener('keyup', e =>{
    if(e.key == "Enter" && inputField.value != ""){
        console.log("hello")
    }
}) 