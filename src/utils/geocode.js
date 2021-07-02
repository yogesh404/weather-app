const request = require('postman-request');

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(location) + ".json?limit=1&access_token=pk.eyJ1IjoieW9nZXNoNDA0IiwiYSI6ImNrcWRlYW1oNjA2cDcyb3F2aDF2NmQzNm0ifQ.Sckj2hi0IkgSIhYxBemSkg"
    request({ url, json: true }, (err, {body}={}) => {
        if (err) {
            callback('Unable to connect to geocoding service!')
        } else if (body.message) {
            callback('Enter location query.')
        } else if (body.features.length === 0) {
            callback('Location not found. Try another search.')
        } else {
            data = {
                longitude: body.features[0].geometry.coordinates[0],
                latitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            }
            callback(undefined, data) 
        }
    })
}

module.exports = geocode