import express from 'express'
import multer from 'multer'
import validateAccess from '../../authentication/validateAccess.js'
import { cloudAvatarsStorage } from '../../config/cloudStorage.js'
import handlers from './handlers.js'
import { getUser } from './utils.js'
import validation from './validation.js'

const { userLoginValidation, userCreationValidation, passwordValidation } =
    validation
const {
    create,
    getAllUsers,
    checkEmail,
    login,
    emailConfirmation,
    passwordReset,
    updateUser,
    passwordResetRequest,
    saveAvatar
} = handlers

const router = express.Router()

//get all users
// create user

router.route('/').get(getAllUsers).post(userCreationValidation, create)

// check email for acc creation
router.route('/check').post(checkEmail)
// request reset password
router.route('/reset').put(passwordResetRequest)
// update user
router.route('/update').put(validateAccess, getUser, updateUser)
// create avatar
router
    .route('/avatar')
    .put(
        validateAccess,
        getUser,
        multer({ storage: cloudAvatarsStorage }).single('avatar'),
        saveAvatar
    )
// login
router.route('/login').post(userLoginValidation, login)
// reset password code

router.route('/reset/:resetCode').put(passwordValidation, passwordReset)
// acc confirmation
router.route('/:token').put(emailConfirmation)

export default router

/*

200 - OK
201 - Created
202 - Accepted 

400 - Bad request
401 - Unauthorized -- AUTENTICAÇÃO, tem caráter temporário.
403 - Forbidden -- AUTORIZAÇÃO, tem caráter permanente.
404 - Not found.

500 - Internal server error
501 - Not implemented - a API não suporta essa funcionalidade
503 - Service Unavailable - a API executa essa operação, mas no momento está indisponível


*/
