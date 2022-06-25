import express from 'express'
const router = express.Router()
import Schools from '../model/schools.js'

//FUNÇÕES AUXILIARES

router.get('/', async (req, res) => {
    try {
        const { q } = req.query
        const schools = await Schools.find({ $regex: q })
        // const keys = ["title", "city", "country"];
        // const search = (data) => {
        //   return data.filter((item) =>
        //     keys.some((key) => item[key].toLowerCase().includes(q))
        //   );
        // };

        return res.send(schools.splice(0, 4))
    } catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de escolas!' })
    }
})
export default router

/*

200 - OK
201 - Created
202 - Accepted 

400 - Bad request
401 - Unauthorized -- AUTENTICAÇÃO, tem caráter temporário.
403 - Forbidden -- AUTORIZAÇÃO, tem caráter permanente.
404 - Not found.

500 - Internal server error
501 - Not implemented - a API não suporta essa funcionalidade
503 - Service Unavailable - a API executa essa operação, mas no momento está indisponível


*/
