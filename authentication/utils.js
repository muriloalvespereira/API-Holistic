import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, {
        expiresIn: config.jwt_expires_in
    })
}

const utils = {
    createUserToken
}

export default utils
