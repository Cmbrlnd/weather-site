const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=583f07c48111401497f92c9db481c664&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.')
        }else if(body.error){
            callback('Unable to find location.')
        }else{
            callback(undefined, {
                description: body.current.weather_descriptions,
                temperature: ' Current temperature: ' + body.current.temperature + ' degrees celsius.',
                feelsLike: ' Feels like: ' + body.current.feelslike + ' degrees celsius.',
                wind: ' Wind speed: ' + body.current.wind_speed + ' km/h. ' + body.current.wind_dir,
                humidity: ' Humidity: ' + body.current.humidity + '%',
                tempNum: parseInt(body.current.temperature),
                feelsNum: parseInt(body.current.feelslike)
        }
            )
        }
    })
}

module.exports = forecast