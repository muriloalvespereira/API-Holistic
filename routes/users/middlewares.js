import jwt from 'jsonwebtoken'
import config from '../../config/config.js'
import Users from '../../db/model/User.js'
import bcrypt from 'bcrypt'
import utils from '../../authentication/utils.js'

const { createUserToken } = utils
const create = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).send({ error: 'Dados insuficientes!' })

    try {
        if (await Users.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já registrado!' })

        const user = await Users.create(req.body)
        user.password = undefined

        return res.status(201).send({ user, token: createUserToken(user.id) })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'Erro ao buscar usuário!' })
    }
}

const middlewares = { create }

export default middlewares
