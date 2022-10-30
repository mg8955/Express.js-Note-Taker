const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// Get route for retrieving all notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Get route for retrieving single saved note
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            return result.length > 0
            ? res.json(result)
            : res.json('Note not found');
        });
});

//POST route for adding notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
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