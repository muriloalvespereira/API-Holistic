import mongoose from 'mongoose'
const Schema = mongoose.Schema

const amenitiesList = [
    'amenity_1',
    'amenity_2',
    'amenity_3',
    'amenity_4',
    'amenity_5'
]

const Schools = new Schema(
    {
        schoolName: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        website: { type: String },
        description: { type: String },
        email: { type: String, lowercase: true },
        whatsapp: { type: String },
        telegram: { type: String },
        youTube: { type: String },
        tikTok: { type: String },
        facebook: { type: String },
        instagram: { type: String },
        logo: { type: String },
        photo_main: { type: String },
        photo_sec: { type: String },
        photo_third: { type: String },
        photo_quart: { type: String },
        cert_main: { type: String },
        cert_sec: { type: String },
        cert_third: { type: String },
        cert_quart: { type: String },
        amenities: [{ type: String, enum: amenitiesList }],
        localities: [{ type: String }],
        clicks: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
        schoolUser: { type: Schema.Types.ObjectId, ref: 'Users' }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('School', Schools)
