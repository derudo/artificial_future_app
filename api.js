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

    //puppeteer
    /* (async() => {
         const browser = await puppeteer.launch();
         const page = await browser.newPage();

         // Navigate the page to a URL
         await page.goto('http://localhost:8000/');

         await page.pdf({
             format: 'A4'
         }).then((buffer) => {
             http.request({
                     'hostname': targetIP,
                     'path': "/printers",
                     'auth': apiKey + ":"
                 },
                 function(response) {
                     console.log('STATUS: ' + response.statusCode);
                     response.setEncoding('utf8');
                     response.on('data', function(chunk) {
                         console.log('BODY: ' + chunk);
                         //Id vom richtigen Drucker raussuchen
                         //Printjob zusammenbauen
                         //Post an richtigen Drucker
                     });
                 });

         });

         await browser.close();

     })();*/
});

// Aktueller inhalt abrufen
app.get('/getContent', (req, res) => {
    res.json(currentContent);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
app.get('/', function(req, res) {
    res.sendFile('C:/Users/maxan/OneDrive/Desktop/uni/bachelor/Api/index.html');
    console.log(__dirname);
});