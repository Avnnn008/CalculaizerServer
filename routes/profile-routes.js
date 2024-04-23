const { Router } = require("express");
const changePasswordController = require('../controllers/ProfileControllers/changePasswordController')
const auth = require('../middleware/auth-middleware')
const changeNameController = require('../controllers/ProfileControllers/changeNameController')
const {getUserInfoController} = require('../controllers/ProfileControllers/getUserInfoController')
const deleteProfileController = require('../controllers/ProfileControllers/deleteProfileController');
const deleteDeviceController = require("../controllers/ProfileControllers/deleteDeviceController");
const getDevicesController = require("../controllers/ProfileControllers/getDevicesController");

const router = Router()

router.get('/get', auth, getUserInfoController)
router.get('/device/all', auth, getDevicesController)
router.post("/changepassword", auth, changePasswordController);
router.post('/changename', auth,  changeNameController)
router.post('/device/delete', auth, deleteDeviceController)
router.post('/delete', auth, deleteProfileController)
  

module.exports = router