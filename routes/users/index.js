import express from 'express'
import handlers from './handlers.js'
import validation from './validation.js'

const { userLoginValidation, userCreationValidation, passwordValidation } =
    validation
const {
    create,
    getAllUsers,
    checkEmail,
    login,
    emailConfirmation,
    passwordReset
} = handlers

const router = express.Router()

router.route('/').get(getAllUsers).post(userCreationValidation, create)

router.route('/check').post(checkEmail)
router.route('/reset').put(passwordValidation, passwordReset)

router.route('/login').post(userLoginValidation, login)
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
