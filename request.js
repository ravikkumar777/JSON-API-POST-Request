const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
    var baseUrl = 'http://jsonplaceholder.typicode.com/users/';
    var finalUrl = baseUrl + req.body.usrnum;

    request(finalUrl, function (error, response, body) {
        var data = JSON.parse(body);
        // res.send('Name: ' + data.name);
        res.render("result", {
            id: data.id,
            name: data.name,
            userName: data.username,
            email: data.email,
            address: data.address.city,
            phone: data.phone,
            webSite: data.website
        });
    })
})

app.listen(3000, function () {
    console.log('server is running at 3000');
});