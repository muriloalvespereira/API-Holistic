const userLoginValidation = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ success: false, msg: 'Invalid body' })
    }
    next()
}
const userCreationValidation = (req, res, next) => {
    const { email, password, name, lastName, phone_1, accountType, cookies } =
        req.body
    const bodyList = [
        email,
        password,
        name,
        lastName,
        phone_1,
        accountType,
        cookies
    ]
    if (
        bodyList.includes(undefined) ||
        bodyList.includes(null) ||
        bodyList.includes('') ||
        !email.includes('@') ||
        password.length < 5
    ) {
        return res.status(400).send({ success: false, msg: 'Invalid body' })
    }
    next()
}

const passwordValidation = (req, res, next) => {
    const { password } = req.body
    if (!password || password.length < 6) {
        return res.status(400).send({ success: false, msg: 'Invalid body' })
    }
    next()
}

const validation = {
    userLoginValidation,
    userCreationValidation,
    passwordValidation
}

export default validation
