const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;
//const puppeteer = require('puppeteer');
const http = require('http');

let goodQueue = [];
let evilQueue = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/updateContent', (req, res) => {
    if (req.body.gesinnung == 0) {
        goodQueue.push(req.body);
        console.log('Content added to goodQueue:', req.body);
    } else {
        evilQueue.push(req.body);
        console.log('Content added to evilQueue:', req.body);
    }

    res.send('Content updated');
});

// Get current content
app.get('/getGood', (req, res) => {
    if (goodQueue.length > 0) {
        const content = goodQueue.shift();
        console.log('Content retrieved from goodQueue:', content);
        res.status(200).json({ "data": content, "message": "Content retrieved from good queue" });
    } else {
        console.log('Attempt to get content from empty goodQueue.');
        res.status(404).json({ "data": null, "message": "Good queue is empty" });
    }
});

app.get('/getEvil', (req, res) => {
    if (evilQueue.length > 0) {
        const content = evilQueue.shift();
        console.log('Content retrieved from evilQueue:', content);
        res.status(200).json({ "data": content, "message": "Content retrieved from evil queue" });
    } else {
        console.log('Attempt to get content from empty evilQueue.');
        res.status(404).json({ "data": null, "message": "Evil queue is empty" });
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log(__dirname);
});