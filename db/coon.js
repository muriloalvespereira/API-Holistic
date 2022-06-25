import mongoose from 'mongoose'
import config from '../config/config.js'

const url = config.bd_string
const options = {
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err)
})

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!')
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!')
})
