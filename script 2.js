
const wrapper = document.querySelector(".wrapper")
    inputPart = document.querySelector(".input-part")
infoText = document.querySelector(".info-text")
inputField = document.querySelector("input")
getLocationBtn = document.querySelector("button")
arrowBack = wrapper.querySelector("header i")
weatherIcon = document.querySelector("weather-part img")

//..api 
let api
var apiKey = "5c37294524c56b2e84a0ae6df81e3e45"

function requestApi(city){
    //..addded {&units=metric} to the api to round up the number to the nearest 
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fectchWeatherData()
}

function fectchWeatherData(){
    infoText.innerText="Getting weather info..."
    infoText.classList.add("pending")
    //...get server and return api response
    fetch(api).then(response => response.json()).
    then(result => weatherDetails(result)) 
}

function weatherDetails(info){
    infoText.classList.replace("pending", "error") //..our css style changes the text info background 
    if(info.cod == "404"){ //..cod is an object called from the weather api
        infoText.innerText = `You entered ${inputField.value} which isn't a valid city` //..checks for validation
    } else{
         //..get api data to properties in info-text   
        const city = info.name
        const country = info.sys.country
        const {description, id} = info.weather[0]
        const{feels_like,humidity, temp} = info.main

        //..parse the above values into the html elements 
        wrapper.querySelector(".temp, .numb").innerText = Math.floor(temp) //..round up number to nearest Integer
        wrapper.querySelector(".weather").innerHTML = description
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`

        infoText.classList.remove("pending", "error") //..if we get the correct city from the api we hide pending and error message
        wrapper.classList.add("active") //..show the dashboard which displays the weather info
    }
}

getLocationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){ //..if user's browser supports geolocation
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        alert("Browser doesn't support geolocation api")
    }
})



function onSuccess(position){
    const {latitude, longitude} = position.coords //..getting the lat and long from coordinator object
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    //..addded {&units=metric} to the api to round up the number
    fectchWeatherData()
}

function onError(error){
  infoText.innerText = error.message //..html text will display error message
  infoText.classList.add("error")
}


inputField.addEventListener("keyup", e=>{
    //...if user pressed enter btn input value is not empty 
    if(e.key == "Enter" && inputField.value !=""){
        requestApi(inputField.value)
    }
})

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active")
})