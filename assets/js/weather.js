const apiKey = `767598619d236762077a0a2005f5fd11`;
const content = document.querySelector(".content");
const inputPart = content.querySelector(".input__part");
const infoTxt = inputPart.querySelector(".info__text");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");
const icon = content.querySelector(".weather__part .weather__icon");
const back = content.querySelector("h1 i");

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
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("erro");
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
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

        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if (id == 800) {
            icon.src = "./assets/img/clear.png";
        }else if (id >= 200 && id <= 232) {
            icon.src = "./assets/img/strom.png";
        }else if (id >= 600 && id <= 622) {
            icon.src = "./assets/img/snow.png";
        }else if (id >= 701 && id <= 781) {
            icon.src = "./assets/img/haze.png";
        }else if (id >= 801 && id <= 804) {
            icon.src = "./assets/img/cloud.png";
        }else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            icon.src = "./assets/img/rain.png";
        } 

        content.querySelector(".temp .numb").innerText = Math.floor(temp);
        content.querySelector(".weather").innerText = description;
        content.querySelector(".location span").innerText = `${city}, ${country}`;
        content.querySelector(".temp .numb__2").innerText = Math.floor(feels_like);
        content.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "erro");
        content.classList.add("active");
    }
}

back.addEventListener("click", () => {
    content.classList.remove("active");
})