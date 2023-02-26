const apiKey = `767598619d236762077a0a2005f5fd11`;
const content = document.querySelector(".content");
const inputPart = content.querySelector(".input__part");
const infoTxt = inputPart.querySelector(".info__text");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
}) 

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    infoTxt.innerText = "Pegando detalhes do tempo...";
    infoTxt.classList.add("pending");
    fetch(api).then(Response => Response.json()).then(result => weatherDetail(result));
}

function weatherDetail(info){
    console.log(info);
}