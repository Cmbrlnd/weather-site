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
    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) =>{
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                console.log(data.forecast.description[0])

                const locImg = document.createElement("i")
                locImg.className += " fas fa-map-pin"

                const weatherDesc = document.createElement("i")
                if(data.forecast.description[0].includes("sun" || "clear")){
                    weatherDesc.className += " wi wi-day-sunny"
                }
                else if(data.forecast.description[0].includes("cloud")){
                    weatherDesc.className += " wi wi-cloudy"
                }else if(data.forecast.description[0].includes("sprinkle")){
                    weatherDesc.className += " wi wi-sprinkle"
                }else if(data.forecast.description[0].includes("shower")){
                    weatherDesc.className += " wi wi-showers"
                }else if(data.forecast.description[0].includes("rain")){
                    weatherDesc.className += " wi wi-rain"
                }else if(data.forecast.description[0].includes("thunder" || "lightning")){
                    weatherDesc.className += " wi wi-thunderstorm"
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
                messageOneImg.appendChild(locImg)
                messageTwo.textContent = data.forecast.description
                messageTwoImg.appendChild(weatherDesc)
                messageThree.textContent = data.forecast.temperature
                messageThreeImg.appendChild(tempImg)
                messageFour.textContent = data.forecast.feelsLike
                messageFourImg.appendChild(feelsImg)
                messageFive.textContent = data.forecast.humidity
                messageFiveImg.append(humidImg)
                messageSix.textContent = data.forecast.wind
                messageSixImg.appendChild(windImg)
            }
        })
    })
})