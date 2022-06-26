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
        title: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        website: { type: String },
        email: { type: String, lowercase: true },
        whatssapp: { type: String },
        telegram: { type: String },
        description: { type: String },
        ratting: { type: Number, min: 0, max: 5 },
        amenities: [{ type: String, enum: amenitiesList }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('School', Schools, 'allschools')
