// write appropriate routes on back-end
// refer to activity 20 solved for help
const express = require('express');
const path = require('path');
const uuid = require('./public/helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Get request for notes



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);