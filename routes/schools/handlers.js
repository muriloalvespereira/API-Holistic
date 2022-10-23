import Schools from '../../db/model/schools.js'
import User from '../../db/model/User.js'
import { sanitizeSchool } from './utils.js'

const getSchools = async (req, res, next) => {
    try {
        const { q } = req.query
        let results = []
        res.status(400).send({
            success: false,
            msg: 'Nenhuma escola encontrada!'
        })
        return
        if (q) {
            results = await Schools.find({
                $text: { $search: q, $caseSensitive: false }
            })
        } else {
            results = await Schools.find()
        }

        // const keys = ["title", "city", "country"];
        // const search = (data) => {
        //   return data.filter((item) =>
        //     keys.some((key) => item[key].toLowerCase().includes(q))
        //   );
        // };

        return res.send(results)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const newSchool = sanitizeSchool(req.body)

        const school = await Schools.create({
            schoolUser: req.user._id,
            ...newSchool,
            logo: req.files.logo[0].path,
            photo_main: req.files.photo_main[0].path,
            photo_sec: req.files.photo_sec[0].path,
            photo_third: req.files.photo_third[0].path,
            photo_quart: req.files.photo_quart[0].path,
            cert_main: req.files.cert_main[0].path,
            cert_sec: req.files.cert_sec[0].path,
            cert_third: req.files.cert_third[0].path,
            cert_quart: req.files.cert_quart[0].path
        })

        const updateUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                schoolId: school._id
            },
            { new: true }
        ) //.populate('schoolId')

        if (updateUser) {
            return res.status(201).send({ school, updateUser, success: true })
        } else {
            return res
                .status(400)
                .send({ success: 'false', msg: 'Escola não criada!' })
        }
    } catch (err) {
        next(err)
    }
}

const updateSchool = async (req, res, next) => {
    const schoolBody = sanitizeSchool(req.body)
    try {
        const updatedSchool = await Schools.findByIdAndUpdate(
            req.user.schoolId,
            schoolBody,
            { new: true }
        )
        console.log(updatedSchool, 'updatedSchool')

        if (updatedSchool) {
            res.status(200).send({
                success: true,
                msg: 'Escola atualizado com sucesso!'
            })
        } else {
            res.status(400).send({
                success: false,
                msg: 'Escola não atualizado!'
            })
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const addClick = async (req, res, next) => {
    try {
        const { schoolID } = req.params
        const userID = req.user._id

        const isClicked = await Schools.find({ _id: schoolID, clicks: userID })

        if (isClicked === 0) {
            const updatedSchool = await Schools.findByIdAndUpdate(
                schoolID,
                {
                    $push: {
                        clicks: userID
                    }
                },
                { new: true }
            )
            if (updatedSchool) {
                res.status(200).send({
                    success: true,
                    msg: 'Click adicionado com sucesso!'
                })
            } else {
                res.status(400).send({
                    success: false,
                    msg: 'Click não adicionado!'
                })
            }
        } else {
            res.status(400).send({
                success: false,
                msg: 'Click não adicionado!'
            })
        }
    } catch (err) {
        next(err)
    }
}

const handlers = { getSchools, create, updateSchool, addClick }

export default handlers
