const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
    const unit = 'm'
    const url = `http://api.weatherstack.com/current?access_key=2d26712d38a3a629ab8f1111af3f3aef&query=${longitude},${latitude}&units=${unit}`

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback ('Unable to reach weather')
        } else if (body.error){
            callback('Unable to find location')
        } else {
            callback(undefined, 
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees.`
            )
        }
    })
}

module.exports = forecast