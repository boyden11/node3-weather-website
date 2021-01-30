
const request = require('postman-request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGVuaGFtZSIsImEiOiJja2theHR2anIwOTA3Mm5xank0Y2d5MzZpIn0.qR33CTlpi-PUSoDjQ4Fmag&limit=1`
    request ({url, json: true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to server.')
        } else if (body.features.length === 0){
            callback('Cannot find location.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode