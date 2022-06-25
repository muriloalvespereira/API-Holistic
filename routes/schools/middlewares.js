import Schools from '../../db/model/schools.js'

const getSchools = async (req, res) => {
    try {
        const { q } = req.query
        const newRegex = new RegExp(q, 'gmi')
        console.log(q, '342423ijhrvik23jlrjf23p;krpo32kr')
        const schools = await Schools.find({
            $text: { $search: q, $caseSensitive: false }
        })
        // const keys = ["title", "city", "country"];
        // const search = (data) => {
        //   return data.filter((item) =>
        //     keys.some((key) => item[key].toLowerCase().includes(q))
        //   );
        // };

        return res.send(schools.splice(0, 4))
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'Erro na consulta de escolas!' })
    }
}

const middlewares = { getSchools }

export default middlewares
