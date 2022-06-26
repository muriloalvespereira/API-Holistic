import randomstring from 'randomstring'
const genTempToken = () => {
    const token = randomstring.generate({
        length: 20,
        charset: 'alphabetic'
    })

    return token
}

export default genTempToken
