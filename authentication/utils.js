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

const setAuthCookie = (res, authToken) => {
    res.cookie('Authentication', `Bearer ${authToken}`, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: false,
        secure: false
    })
}

const utils = {
    createUserToken,
    checkUserPassword,
    setAuthCookie
}

export default utils
