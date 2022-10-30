const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

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

notes.delete(`/:id`, (req, res) => {
    const noteDelete = req.params.id;
  
    db = db.filter((note) => note.id != noteDelete )
    
    writeToFile('./db/db.json', db)
    res.json('Your note was deleted!');
  
  })

module.exports = notes;