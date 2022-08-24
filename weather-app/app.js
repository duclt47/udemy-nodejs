
const request = require("request");
const temp_url = "http://api.weatherstack.com/current?access_key=a398be492661b00b8a69138232539163&query=37.8267,-122,4233"


request({ url: temp_url }, (err, res) => {
    const data = JSON.parse(res.body);
    console.log(data)
})