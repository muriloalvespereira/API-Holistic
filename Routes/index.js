import express from 'express'
import auth from '../authentication/auth.js'
const router = express.Router()

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data)
    return res.send({
        message:
            'Essa informação é muito importante. Usuários não autorizados não deveriam recebê-la!'
    })
})

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok com o método POST da raiz!' })
})

export default router
