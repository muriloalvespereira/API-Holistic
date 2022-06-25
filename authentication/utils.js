import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../config/config.js'

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, {
        expiresIn: config.jwt_expires_in
    })
}

const checkUserPassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword)
}

const utils = {
    createUserToken,
    checkUserPassword
}

export default utils
