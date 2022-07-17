import express from 'express'
import handlers from './handlers.js'
import { hasSchool, isSchool } from './utils.js'
import validateAccess from '../../authentication/validateAccess.js'
import { getUser } from '../users/utils.js'
const { getSchools, create, updateSchool, addClick } = handlers

const router = express.Router()

router
    .route('/')
    .get(getSchools)
    .post(validateAccess, getUser, isSchool, hasSchool, create)

router.route('/update').put(validateAccess, getUser, isSchool, updateSchool)

//test later
router.route('/click/:schoolID').put(validateAccess, getUser, addClick)
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
