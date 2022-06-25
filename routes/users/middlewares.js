import Users from '../../db/model/User.js'
import utils from '../../authentication/utils.js'

const { createUserToken, checkUserPassword } = utils
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

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({})
        return res.send(users)
    } catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' })
    }
}

const checkEmail = async (req, res) => {
    const { email } = req.body
    try {
        if (await Users.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já registrado!' })
        return res.status(200).send({ email: 'Email not found' })
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).send({ error: 'Dados insuficientes!' })

    try {
        const user = await Users.findOne({ email }).select('+password')
        if (!user)
            return res.status(400).send({ error: 'Usuário não registrado!' })

        const pass_ok = await checkUserPassword(password, user.password)

        if (!pass_ok)
            return res
                .status(401)
                .send({ error: 'Erro ao autenticar usuário!' })

        user.password = undefined
        return res.send({ user, token: createUserToken(user.id) })
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' })
    }
}

const middlewares = { create, getAllUsers, checkEmail, login }

export default middlewares
