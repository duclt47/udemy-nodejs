const request = require("request");
const geocode = (location, callback) => {
    const access_key = 'b80c95b645b998a28a851bc96cd6c6c0';
    const url = "http://api.positionstack.com/v1/forward?access_key=" + access_key + "&query=" + location;
    console.log(url)
    request({ url, json: true }, (serverError, response, { error, data }) => {
        if (serverError) {
            callback('Unable to connect to location services!', undefined)
        } else if (error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: data[0].latitude,
                longitude: data[0].longitude,
                location: data[0].label
            })
        }
    })
}

module.exports = geocode