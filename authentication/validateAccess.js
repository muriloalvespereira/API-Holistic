import jwt from 'jsonwebtoken'

const { verify } = jwt

const verifyAuthorizationToken = (token) => {
    try {
        const res = verify(token, process.env.JWT_SECRET_KEY)

        return res
    } catch (error) {
        return error.name
    }
}

const validateAccess = async (req, res, next) => {
    try {
        if (!req.headers?.authorization) {
            return res
                .status(401)
                .send({ success: false, error: 'Token missing' })
        }

        const authToken = req.headers.authorization.split(' ')[1]
        const tokenData = verifyAuthorizationToken(authToken)
        if (tokenData?.id) {
            req.acc_id = tokenData.id
            next()
        } else {
            return res.status(400).send({
                success: false,
                msg: 'Token inválido!'
            })
        }
    } catch (error) {
        next(error)
    }
}

export default validateAccess
