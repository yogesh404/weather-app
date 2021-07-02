const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yogay'
    })
})

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Hol up.. Help is on its way',
        name: 'Yogay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        pageHeading: 'About',
        name: 'Yogay'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a location.'
        })
    }
    geocode(req.query.search, (err, {latitude, longitude, location}={}) => {
        if(err) return res.send({
            error: err
        })
        forecast(latitude, longitude, (err, {description: forecast, temperature, forecastString}={}) => {
            if(err) return res.send({
                error: err
            })
            res.send({
                forecast,
                temperature,
                location,
                searchTerm: req.query.search,
                forecastString
            })
        })

    })
})



app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Error 404',
        error: 'Help page not found',
        name: 'Yogay'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        error: 'Page not found',
        name: 'Yogay'
    })
})


app.listen(port, '0.0.0.0', () => {
    console.log('Server up and running on port '+port);
})