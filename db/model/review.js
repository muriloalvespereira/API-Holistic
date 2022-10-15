import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Review = new Schema(
    {
        rating: { type: String, required: true },
        reviews: [
            {
                user: { type: String },
                avatar: { type: String },
                text: { type: String },
                rating: { type: String }
            }
        ],
        school: [{ type: Schema.Types.ObjectId, ref: 'schools' }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Review', Review)
