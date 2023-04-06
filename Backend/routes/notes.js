const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// ENDPOINT 1 : Get all the Notes using : GET "/api/notes/fetchallNotes". Login required
router.get('/fetchallNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }

})

// ENDPOINT 2 : Add a new note using : POST "/api/notes/addNotes". Login required
router.post('/addNotes', fetchUser, [
    // Validation
    body('title', 'Title must consists of minimum 3 characters').isLength({ min: 3 }),
    body('description', 'Description must consists of minimum 6 characters').isLength({ min: 6 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // if no errors, create a new note using the details in request
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        // save the created note.
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// ENDPOINT 3 : Update an existing Note using : PUT "/api/notes/updateNote/:noteId". Login required
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // Create a new note object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        // if note doesn't exist already.
        if (!note) {
            return res.status(400).json({ error: "No note exists with such id" });
        }
        // Allow to perform updations only by owner of the note
        // if the user_id stored in note and the current req user_id doesnot match, then unauthorised access.
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Access Denied!");
        }

        // update note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }

})

// ENDPOINT 4 : Delete a Note
// Way 1 : using POST "/api/notes/deleteNote1". Login required
router.post('/deleteNote1', fetchUser, async (req, res) => {
    try {
        // delete the note with given user_id and title.
        const deleteStatus = await Note.deleteOne({ user: req.user.id, title: req.body.title });
        // if no note with given details exists, then return error.
        if (deleteStatus.deletedCount == 0) {
            return res.status(400).json({ error: "No note exists with the given title." });
        }
        // else delete that note.
        res.send(deleteStatus.deletedCount + " note deleted.");
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// Way 2 : using DELETE "/api/notes/deleteNote". Login required
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

    try {
        // Find the note to be deleted and id exists then delete it.
        let note = await Note.findById(req.params.id);
        // if note doesn't exist already.
        if (!note) {
            return res.status(400).json({ error: "No note exists with such id" });
        }
        // Allow to perform deletions only by owner of the note
        // if the user_id stored in note and the current req user_id doesnot match, then unauthorised access.
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Access Denied!");
        }

        // delete note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted!", note: note });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// ENDPOINT 5 : Get all the Notes by Tag name : POST "/api/notes/fetchNotesByTag". Login required
router.post('/fetchNotesByTag', fetchUser, async (req, res) => {
    const { tag } = req.body;
    try {
        const notes = await Note.find({ user: req.user.id });
        let taggedNotes = notes.filter(note => note.tag === tag);
        res.json(taggedNotes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// ENDPOINT 6 : Delete all the notes of a user : DEL "/api/notes/deleteAllNotes". Login required.
router.delete('/deleteAllNotes', fetchUser, async (req, res) => {
    try {
        // find all the notes of User and delete them from the database.
        const notes = await Note.deleteMany({user: req.user.id});
        success = true;
        res.json({success});
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router;