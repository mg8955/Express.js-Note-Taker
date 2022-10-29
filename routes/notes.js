const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../public/helpers/fsUtils');

// Get route for retrieving notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

//POST route for adding notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            noteId: uuidv4()
        };
console.log(newNote);
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'accepted',
            body: newNote
        };

        res.json(response);
    } else {
        res.json('Error in publishing note!');
    }
});

module.exports = notes;