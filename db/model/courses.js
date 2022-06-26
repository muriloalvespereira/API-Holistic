import mongoose from 'mongoose'
const Schema = mongoose.Schema

const coursesList = ['course_1', 'course_2', 'course_3', 'course_4', 'course_5']
const levelsList = ['level_1', 'level_2', 'level_3', 'level_4', 'level_5']

const Courses = new Schema(
    {
        title: { type: String, required: true, enum: coursesList },
        description: { type: String },
        startingDate: { type: Date },
        price: { type: String },
        duration: { type: String },
        level: [{ type: String, enum: levelsList }],
        school_ID: {
            type: Schema.Types.ObjectId,
            ref: 'School',
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Courses', Courses)
