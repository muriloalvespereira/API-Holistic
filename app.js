import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import indexRoute from './routes/index.js'
import usersRoute from './routes/users.js'
import schoolsRoute from './routes/schools.js'
import './db/coon.js'
const app = express()

const port = process.env.PORT || 3005

//BODY PARSER
app.use(bodyParser.json())

app.use(cors())
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', 'https://holistic.vercel.app');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Requested-With, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
//     if (req.method === "OPTIONS") {
//         return res.status(200).end();
//     } else {
//         next();
//     }
// });

app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use('/schools', schoolsRoute)

app.listen(port, () => {
    console.log(`API rodando na porta ===> ${port}`)
})

export default app
