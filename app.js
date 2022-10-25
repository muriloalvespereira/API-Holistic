import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import usersRoute from './routes/users/index.js'
import schoolsRoute from './routes/schools/index.js'
import errorHandlers from './utils/errors_handlers.js'
import './db/coon.js'
import cookieParser from 'cookie-parser'
import corsConfig from './config/cors.js'
import morgan from 'morgan'

const app = express()

const port = process.env.PORT || 3005

//BODY PARSER
app.use(bodyParser.json())

app.use(cors(corsConfig))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/users', usersRoute)
app.use('/schools', schoolsRoute)

const { statusErrorMiddleware, serverError } = errorHandlers
app.use(statusErrorMiddleware)
app.use(serverError)

app.listen(port, () => {
    console.log(`API rodando na porta ===> ${port}`)
})

export default app
