import Schools from '../../db/model/schools.js'

const getSchools = async (req, res, next) => {
    try {
        const { q } = req.query

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
        next(err)
    }
}

const handlers = { getSchools }

export default handlers
