const { Router } = require("express");
const auth = require('../middleware/auth-middleware')
const saveNewEventController = require('../controllers/EventsControllers/saveNewEventController')
const deleteEventController = require('../controllers/EventsControllers/deleteEventController');
const getEventsController = require("../controllers/EventsControllers/getEventsController");

const router = Router()

router.get('/all', auth, getEventsController)
router.post('/new', auth, saveNewEventController)
router.post('/delete', auth, deleteEventController)


module.exports = router