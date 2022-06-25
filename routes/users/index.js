import express from 'express'
import middlewares from './middlewares.js'

const { create, getAllUsers, checkEmail, login } = middlewares

const router = express.Router()

router.route('/').get(getAllUsers).post(create)

router.route('/check').post(checkEmail)

router.route('/login').post(login)

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
