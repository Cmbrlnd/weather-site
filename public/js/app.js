const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageOneImg = document.querySelector('#message-1-img')
const messageTwo = document.querySelector('#message-2')
const messageTwoImg = document.querySelector('#message-2-img')
const messageThree = document.querySelector('#message-3')
const messageThreeImg = document.querySelector('#message-3-img')
const messageFour = document.querySelector('#message-4')
const messageFourImg = document.querySelector('#message-4-img')
const messageFive = document.querySelector('#message-5')
const messageFiveImg = document.querySelector('#message-5-img')
const messageSix = document.querySelector('#message-6')
const messageSixImg = document.querySelector('#message-6-img')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    $("input").blur();

    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''
    messageOneImg.innerHTML = ''
    messageTwoImg.innerHTML = ''
    messageThreeImg.innerHTML = ''
    messageFourImg.innerHTML = ''
    messageFiveImg.innerHTML = ''
    messageSixImg.innerHTML = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) =>{
            if (data.error) {
                messageOne.textContent = data.error
            }else{
                const weatherDescString = data.forecast.description[0].toLowerCase()
                const locImg = document.createElement("i")
                locImg.className += " fas fa-map-pin"
                const weatherDesc = document.createElement("i")

                if(weatherDescString.includes("clear")){
                    weatherDesc.className += " wi wi-day-sunny"
                }else if(weatherDescString.includes("sun")){
                    weatherDesc.className += " wi wi-day-sunny"
                }else if(weatherDescString.includes("cloud")){
                    weatherDesc.className += " wi wi-cloudy"
                }else if(weatherDescString.includes("sprinkle")){
                    weatherDesc.className += " wi wi-sprinkle"
                }else if(weatherDescString.includes("shower")){
                    weatherDesc.className += " wi wi-showers"
                }else if(weatherDescString.includes("rain")){
                    weatherDesc.className += " wi wi-rain"
                }else if(weatherDescString.includes("thunder" || "lightning")){
                    weatherDesc.className += " wi wi-thunderstorm"
                }else if(weatherDescString.includes("overcast")){
                    weatherDesc.className += " wi wi-day-sunny-overcast"
                }else{
                    weatherDesc.className += " wi wi-na"
                }

                const tempImg = document.createElement("i")
                tempImg.className += " wi wi-thermometer"

                const feelsImg = document.createElement("i")
                // If current temp is less than 'feels like temp'
                if(data.forecast.tempNum < data.forecast.feelsNum){
                    feelsImg.className = " wi wi-direction-up"
                }else if(data.forecast.tempNum > data.forecast.feelsNum){
                    feelsImg.className = " wi wi-direction-down"
                }else{
                    feelsImg.className = " wi wi-thermometer"
                }

                const windImg = document.createElement("i")
                windImg.className += " wi wi-strong-wind"

                const humidImg = document.createElement("i")
                humidImg.className += " wi wi-humidity icon"

                messageOne.textContent = data.location
                if(messageOneImg.childNodes.length === 0){
                    messageOneImg.appendChild(locImg)
                }
                messageTwo.textContent = data.forecast.description
                if(messageTwoImg.childNodes.length === 0){
                    messageTwoImg.appendChild(weatherDesc)
                }
                messageThree.textContent = data.forecast.temperature
                if(messageThreeImg.childNodes.length === 0){
                    messageThreeImg.appendChild(tempImg)
                }
                messageFour.textContent = data.forecast.feelsLike
                if(messageFourImg.childNodes.length === 0){
                    messageFourImg.appendChild(feelsImg)
                }
                messageFive.textContent = data.forecast.humidity
                if(messageFiveImg.childNodes.length === 0){
                    messageFiveImg.append(humidImg)
                }
                messageSix.textContent = data.forecast.wind
                if(messageSixImg.childNodes.length === 0){
                    messageSixImg.appendChild(windImg)
                }
            }
        })
    })
})