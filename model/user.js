import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, select: false }
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
