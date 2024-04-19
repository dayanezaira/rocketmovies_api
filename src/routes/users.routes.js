const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require('../controllers/UsersController')
const UserControllerAvatar = require('../controllers/UserControllerAvatar')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRouters = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userControllerAvatar = new UserControllerAvatar()

usersRouters.post('/', usersController.create)
usersRouters.put('/', ensureAuthenticated, usersController.update)
usersRouters.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userControllerAvatar.update)

module.exports = usersRouters
