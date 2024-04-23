const { Router } = require("express");
const auth = require('../middleware/auth-middleware');
const isAdmin = require('../middleware/isAdmin-middleware')
const adminEnterController = require("../controllers/AdminControllers/adminEnterController");
const userInfoController = require("../controllers/AdminControllers/UserSection/userInfoController");
const adminCheckingController = require("../controllers/AdminControllers/adminCheckingController");
const getUsersController = require("../controllers/AdminControllers/UserSection/getUsersController");
const changeUserVipStatusController = require("../controllers/AdminControllers/UserSection/changeUserVipStatusController");
const sendEmailController = require("../controllers/AdminControllers/UserSection/sendEmailController");
const deleteDeviceController = require("../controllers/AdminControllers/UserSection/deleteDeviceController");
const refreshAdminTokenController = require("../controllers/AdminControllers/refreshAdminTokenController");
const adminLogoutController = require("../controllers/AdminControllers/adminLogoutController");
const getErrorsController = require("../controllers/AdminControllers/ErrorSection/getErrorsController");
const deleteErrorController = require("../controllers/AdminControllers/ErrorSection/deleteErrorController");
const getCountOfAdminSectionsDocuments = require("../controllers/AdminControllers/getCountOfAdminSectionsDocuments");
const deleteUserController = require("../controllers/AdminControllers/UserSection/deleteUserController");
const getInfoSectionController = require('../controllers/AdminControllers/InfoSection/getInfoSectionController');
const {createNewChapterController, createNewSubsectionController, deleteChapterController, deleteSubsectionController, createNewContentController, newTitleController, getSubsectionContent, deleteContentController, updateContentController} = require("../controllers/AdminControllers/InfoSection/InfoComponentsControllers");
const multer  = require('multer');
const deleteErrorListController = require("../controllers/AdminControllers/ErrorSection/deleteErrorListController");
const upload = multer()


const router = Router()

/* MAIN */
router.get('/checking', auth, adminCheckingController)
router.post('/enter', auth, adminEnterController)
router.get('/count', isAdmin, getCountOfAdminSectionsDocuments)
router.get('/refresh', refreshAdminTokenController)
router.get('/logout', adminLogoutController)


/* USER SECTION */
router.get('/users', isAdmin, getUsersController)
router.get('/user', isAdmin, userInfoController)
router.post('/user/changevip', isAdmin, changeUserVipStatusController)
router.post('/sendemail', isAdmin, sendEmailController)
router.post('/deleteuser', isAdmin, deleteUserController)
router.post('/deletedevice', isAdmin, deleteDeviceController)

/* ERROR SECTION */
router.get('/errors', isAdmin, getErrorsController)
router.post('/deleteerrorlist', isAdmin, deleteErrorListController)
router.post('/deleteerror', isAdmin, deleteErrorController)

/* INFO SECTION */
router.get('/infoSection', isAdmin, getInfoSectionController)
router.get('/content', isAdmin, getSubsectionContent)
router.post('/newchapter', isAdmin, createNewChapterController)
router.get('/deletechapter', isAdmin, deleteChapterController)
router.post('/newsubsection', isAdmin, createNewSubsectionController)
router.get('/deletesubsection', isAdmin, deleteSubsectionController)
router.get('/deletecontent', isAdmin, deleteContentController)
router.post('/newcontent', isAdmin, upload.single('file'), createNewContentController)
router.post('/updatecontent', isAdmin, upload.single('file'), updateContentController)
router.post('/newtitle', isAdmin, newTitleController)


module.exports = router