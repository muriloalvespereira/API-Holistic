export const isSchool = (req, res, next) => {
    if (req.user.accountType !== 'school') {
        return res.status(400).send({
            success: false,
            msg: 'Acesso negado!'
        })
    }
    next()
}

export const sanitizeSchool = (school) => {
    return {
        title: school.title,
        city: school.city,
        country: school.country,
        website: school.website,
        email: school.email,
        whatssapp: school.whatssapp,
        telegram: school.telegram,
        description: school.description,
        ratting: 0,
        amenities: school.amenities
    }
}
