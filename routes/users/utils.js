import { genTempToken } from '../../utils/index.js'
import Users from '../../db/model/User.js'

export const sanitizeUser = (body) => {
    const acc_validation_token = genTempToken()
    var minutesToAdd = 15
    var currentDate = new Date()

    const acc_validation_token_expires = new Date(
        currentDate.getTime() + minutesToAdd * 60000
    )

    return {
        email: body.email,
        password: body.password,
        name: body.name,
        lastName: body.lastName,
        phone_1: body.phone_1,
        accountType: body.accountType,
        cookies: body.cookies,
        acc_validation_token,
        acc_validation_token_expires
    }
}

export const sanitizeBody = (body) => {
    return {
        email: body.email,
        name: body.name,
        lastName: body.lastName,
        middleName: body.middleName,
        phone_1: body.phone_1,
        phone_2: body.phone_2,
        whatssapp: body.whatssapp,
        telegram: body.telegram,
        email_2: body.email_2
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await Users.findById(req.acc_id)
        if (!user || !req.acc_id) {
            return res.status(400).send({
                success: false,
                msg: 'Usuário não encontrado!'
            })
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}
