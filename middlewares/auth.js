import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const auth = (req, res, next) => {
    const token_header = req.headers.auth
    if (!token_header)
        return res.status(200).send({ error: 'Token não enviado!' })

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token inválido!' })
        res.locals.auth_data = decoded
        return next()
    })
}

export default auth
