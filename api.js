const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;
//const puppeteer = require('puppeteer');
const http = require('http');

const targetIP = ""; // TODO: IP vom Laptop
const apiKey = ""; //TODO: API Key einfügen

let html;
let currentContent = {
    headline: "Standard-Headline",
    text: "Standard-Text",
    imageUrl: "standard-img-url"
};

let goodQueue = [];
let evilQueue = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/updateContent', (req, res) => {
    if(req.body.gesinnung == 0){
        goodQueue.push(req.body);
    } else{
        evilQueue.push(req.body);
    }
    
    res.send('Content updated');
});

// Aktueller inhalt abrufen
app.get('/getGood', (req, res) => {
    if(goodQueue.length > 0){
        res.json(goodQueue.shift());
    } else {
        res.json("");
    }
});

app.get('/getEvil', (req, res) => {
    if(evilQueue.length > 0){
        res.json(evilQueue.shift());
    } else {
        res.json("");
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log(__dirname);
});