const { JWT_SECRET_KEY, JWT_EXPERING_DATE, MONGO_URL, NODE_ENV } = process.env

const config = {
    bd_string: MONGO_URL,
    jwt_pass: JWT_SECRET_KEY,
    jwt_expires_in: JWT_EXPERING_DATE
}

console.log(`Iniciando a API em ambiente ===> ${NODE_ENV}`)

export default config
