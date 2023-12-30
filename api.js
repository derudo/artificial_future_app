const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;
const puppeteer = require('puppeteer');
const http = require('http');

const targetIP = "" // TODO: IP vom Laptop
const apiKey = ""; //TODO: API Key einfügen

let html;
let currentContent = {
    headline: "Standard-Headline",
    text: "Standard-Text",
    imageUrl: "standard-img-url"
};

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.post('/updateContent', (req, res) => {
    currentContent = req.body;
    res.send('Content updated');


});

// Aktueller inhalt abrufen
app.get('/getContent', (req, res) => {
    res.json(currentContent);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log(__dirname);
});