import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, select: false, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        accountType: {
            type: String,
            enum: ['user', 'admin', 'school'],
            default: 'user',
            required: true
        },
        cookies: {
            type: String,
            enum: ['essential', 'all'],
            default: 'essential',
            required: true
        },
        phone_1: { type: String, required: true },
        middleName: { type: String },
        phone_2: { type: String },
        whatssapp: { type: String },
        telegram: { type: String },
        email_2: { type: String },
        schoolId: { type: Schema.Types.ObjectId, ref: 'School' }
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function (next) {
    let user = this
    if (!user.isModified('password')) return next()

    user.password = await bcrypt.hash(user.password, 10)
    return next()
})

export default mongoose.model('User', UserSchema, 'test')
