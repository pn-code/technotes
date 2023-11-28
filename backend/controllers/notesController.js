const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();

  res.json(notes);
});

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required." });
  }
  console.log(Note);
  const note = await Note.create({ user, title, text });

  if (note) {
    res.status(201).json({ message: `New note ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid note data" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, title, text, completed } = req.body;
  console.log("hit");

  if (!id || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required." });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json({ message: `${updatedNote.title} updated` });
});

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Note ID Required" });
  }

  const note = await Note.findByIdAndDelete(id)

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const response = `Note titled ${note.title} with ID ${note._id} deleted.`;

  res.json(response);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
