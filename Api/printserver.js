const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const printer = require('printer');

const app = express();
const port = 9000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/print', (req, res) => {
    currentContent = req.body;
    res.send('Content updated');

    console.log(printer.getPrinters());
});

app.listen(port, () => console.log(`Printserver listening on port ${port}!`));