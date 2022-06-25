import express from 'express'
import Users from '../../db/model/User.js'
import bcrypt from 'bcrypt'
import middlewares from './middlewares.js'

const { create, getAllUsers, checkEmail } = middlewares

const router = express.Router()

router.get('/', getAllUsers)

router.post('/create', create)

router.post('/check', checkEmail)

router.post('/auth', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).send({ error: 'Dados insuficientes!' })

    try {
        const user = await Users.findOne({ email }).select('+password')
        if (!user)
            return res.status(400).send({ error: 'Usuário não registrado!' })

        const pass_ok = await bcrypt.compare(password, user.password)

        if (!pass_ok)
            return res
                .status(401)
                .send({ error: 'Erro ao autenticar usuário!' })

        user.password = undefined
        return res.send({ user, token: createUserToken(user.id) })
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' })
    }
})

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
