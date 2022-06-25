const userLoginValidation = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ success: false, msg: 'Invalid body' })
    }
    next()
}

const validation = { userLoginValidation }

export default validation
