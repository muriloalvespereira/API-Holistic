const trustableOrigins = [process.env.FRONT_END_URL]

const corsConfig = {
    origin: function (origin, callback) {
        if (!origin || trustableOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Origin not allowed'))
        }
    },
    credentials: true
}

export default corsConfig
