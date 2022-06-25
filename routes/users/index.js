import express from 'express'
import Users from '../../db/model/User.js'
import bcrypt from 'bcrypt'
import middlewares from './middlewares.js'

const { create, getAllUsers, checkEmail, login } = middlewares

const router = express.Router()

router.get('/', getAllUsers)

router.post('/create', create)

router.post('/check', checkEmail)

router.post('/auth', login)

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
