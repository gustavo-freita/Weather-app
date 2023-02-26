const apiKey = `767598619d236762077a0a2005f5fd11`;
const content = document.querySelector(".content");
const inputPart = content.querySelector(".input__part");
const infoTxt = inputPart.querySelector(".info__text");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");

let api;

inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
}) 

locationBtn.addEventListener("click", ()=> {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Seu brower não suporta a API");
    }
})

function onSuccess(position) {
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetchData();
}

function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("erro");
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Pegando detalhes do tempo...";
    infoTxt.classList.add("pending");
    fetch(api).then(Response => Response.json()).then(result => weatherDetail(result));
}

function weatherDetail(info) {
    infoTxt.classList.replace("pending", "erro");
    if(info.cod == "404") {
        infoTxt.innerText = `${inputField.valu} Não é uma cidade valida`;
    } else {
        infoTxt.classList.remove("pending", "erro");
        console.log(info);
    }
}