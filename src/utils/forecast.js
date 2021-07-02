const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0988d386fd5fd2ef39ce08428c36f1fa&query=${latitude},${longitude}&units=m`
    request({url, json: true}, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Error '+body.error.code+'. '+body.error.info)
        } else {
            callback(undefined, { 
                description: body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity,
                weatherIcon: body.current.weather_icons[0],
                forecastString: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees. It is ${body.current.humidity}% humid.`
            })
        }
    })
}

 module.exports = forecast