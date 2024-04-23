const { Router } = require("express");
const auth = require('../middleware/auth-middleware')
const saveNewNoteController = require('../controllers/NotesControllers/saveNewNoteController');
const deleteNoteController = require("../controllers/NotesControllers/deleteNoteController");
const updateNoteController = require('../controllers/NotesControllers/updateNoteController');
const getNotesController = require("../controllers/NotesControllers/getNotesController");

const router = Router()

  router.get('/all', auth, getNotesController)
  router.post('/new', auth, saveNewNoteController)
  router.post('/delete', auth, deleteNoteController)
  router.post('/update', auth, updateNoteController)


module.exports = router