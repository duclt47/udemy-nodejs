const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../../weather-app/utils/geocode');
const forecast = require('../../weather-app/utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Main page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send("Please provide address!!!")
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        const { latitude, longitude, location } = data;
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                forecastData, 'address': req.query.address, location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('App listen on port 3000.')
})
