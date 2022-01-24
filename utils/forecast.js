const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=583f07c48111401497f92c9db481c664&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.')
        }else if(body.error){
            callback('Unable to find location.')
        }else{
            callback(undefined, body.current.weather_descriptions + '\n' + 'Current temperature: ' + body.current.temperature + ' degrees celsius.'
            )
        }
    })
}

module.exports = forecast