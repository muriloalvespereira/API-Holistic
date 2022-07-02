import Users from '../../db/model/User.js'
import utils from '../../authentication/utils.js'
import { sanitizeUser, sanitizeBody } from './utils.js'

const { createUserToken, checkUserPassword, setAuthCookie } = utils

const create = async (req, res, next) => {
    const { email } = req.body

    try {
        if (await Users.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já registrado!' })

        const newUser = sanitizeUser(req.body)

        const user = await Users.create(newUser)

        return res.status(201).send({ user, success: true })
    } catch (err) {
        next(err)
    }
}

const emailConfirmation = async (req, res, next) => {
    try {
        const { token } = req.params
        const acc_validation_token = token

        const user = await Users.findOne({ acc_validation_token })

        console.log(user)

        if (user && user.acc_validation_token_expires > Date.now()) {
            const updatedUser = await Users.findByIdAndUpdate(
                user._id,
                {
                    acc_validation_token: '',
                    acc_validation_token_expires: null,
                    acc_confirmed: true
                },
                { new: true }
            )

            if (updatedUser) {
                res.status(200).send({
                    success: true,
                    msg: 'Account confirmed'
                })
            } else {
                res.status(500).send({
                    success: false,
                    msg: 'Something went wrong'
                })
            }
        } else {
            res.status(400).send({
                success: false,
                msg: 'Account not found'
            })
        }
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find({})
        return res.send(users)
    } catch (err) {
        next(err)
    }
}

const checkEmail = async (req, res, next) => {
    const { email } = req.body
    try {
        if (await Users.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já registrado!' })
        return res.status(200).send({ email: 'Email not found' })
    } catch (err) {
        next(err)
    }
}

const passwordReset = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const updatedUser = await Users.findOneAndUpdate(
            { email },
            { password }
        )
        console.log(updatedUser)

        if (updatedUser) {
            res.status(200).send({
                success: true,
                msg: 'Senha alterada com sucesso!'
            })
        } else {
            res.status(400).send({
                success: false,
                msg: 'Usuário não encontrado!'
            })
        }
    } catch (err) {
        next(err)
    }
}
const updateUser = async (req, res, next) => {
    const sanitizedBody = sanitizeBody(req.body)
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.user._id,
            sanitizedBody
        )
        console.log(updatedUser, 'updatedUser')

        if (updatedUser) {
            res.status(200).send({
                success: true,
                msg: 'Usuário atualizado com sucesso!'
            })
        } else {
            res.status(400).send({
                success: false,
                msg: 'Usuário não atualizado!'
            })
        }
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await Users.findOne({ email }).select('+password')
        if (!user) {
            return res
                .status(404)
                .send({ success: false, msg: 'Usuário não registrado!' })
        }

        const pass_ok = await checkUserPassword(password, user.password)

        if (!pass_ok)
            return res
                .status(401)
                .send({ success: false, msg: 'Erro ao autenticar usuário!' })

        user.password = undefined

        setAuthCookie(res, createUserToken(user._id))

        return res.send({ success: true, msg: 'Cookie set' })
    } catch (err) {
        next(err)
    }
}

const handlers = {
    create,
    getAllUsers,
    checkEmail,
    login,
    emailConfirmation,
    passwordReset,
    updateUser
}

export default handlers
