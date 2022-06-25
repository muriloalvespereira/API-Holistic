import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        title: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('School', UserSchema, 'allschools')
