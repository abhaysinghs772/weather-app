const express = require('express');
const app = express();

const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');

    // res.send('server is up and renning at port 3000');
});

app.post('/', function (req, res) {

    const query = req.body.cityName;
    const api_Key = process.env.API_KEY;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api_Key + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            // console.log(data); // gives hex code
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            console.log(desc);
            console.log(temp);
            const url_icon = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            // console.log(weatherData);
            // res.send('temprature in delhi is '+ temp);
            res.write('<p>weatrher is ' + desc + '</p>');
            res.write('<h1>temprature in ' + query + ' is ' + temp + '</h1>');
            res.write('<img src=' + url_icon + '>');

            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("server has started at port 3000");
});

