const generateFutureDate = (minutesToAdd = 15) => {
    const currentDate = new Date()

    return new Date(currentDate.getTime() + minutesToAdd * 60000)
}

export default generateFutureDate
