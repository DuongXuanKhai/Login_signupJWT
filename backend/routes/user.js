const router = require ("express").Router()
const middlewareController = require("../controllers/middlewareController")
const userController = require ('../controllers/userController')

//get all
router.get('/', middlewareController.verifyToken, userController.getAllUser)

// delete 
router.delete('/:id',middlewareController.verifyTokenAndAdminAuth, userController.deleteUser)
module.exports = router