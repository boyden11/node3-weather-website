const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

const port = process.env.port || 3000


// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Set up handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
//Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ed'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ed'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ed'
    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})


app.get('/help/*',(req,res) => {
    res.render('404', {
        title: 'Error',
        name: 'Ed',
        errorMessage: '404: Help page not found.'
    })
})

app.get('*' ,(req,res)=> {
    res.render('404',{
        title: 'Error',
        name: 'Ed',
        errorMessage: 'Page not found'
    })

})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

