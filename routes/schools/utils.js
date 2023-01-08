export const isSchool = (req, res, next) => {
    if (req.user.accountType !== 'school') {
        return res.status(400).send({
            success: false,
            msg: 'Acesso negado!'
        })
    }
    next()
}

export const hasSchool = (req, res, next) => {
    if (!req.user.schoolId) {
        next()
    } else {
        return res.status(400).send({
            success: false,
            msg: 'School already created'
        })
    }
}

export const sanitizeCourse = (course) => {
    const { title, description, price, duration, level, dates } = course
    return {
        title,
        description,
        price,
        duration,
        level,
        dates
    }
}
export const sanitizeSchool = (school) => {
    const {
        schoolName,
        city,
        country,
        secCountries,
        website,
        description,
        email,
        whatsapp,
        telegram,
        youTube,
        tikTok,
        facebook,
        instagram,
        amenities,
        localities
    } = school
    return {
        schoolName,
        city,
        country,
        secCountries,
        website,
        description,
        email,
        whatsapp,
        telegram,
        youTube,
        tikTok,
        facebook,
        instagram,
        amenities,
        localities
    }
}
