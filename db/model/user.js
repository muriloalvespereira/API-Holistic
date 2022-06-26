import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { accConfirmEmail } from '../../comm/templates/index.js'
import { sendEmail } from '../../comm/index.js'

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
        acc_confirmed: { type: Boolean, default: false },
        authToken: { type: String },
        acc_validation_token: { type: String },
        acc_validation_token_expires: { type: Date },
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

    const confirmEmail = accConfirmEmail(user.email, user.acc_validation_token)
    await sendEmail(confirmEmail)

    return next()
})

UserSchema.methods.toJSON = function () {
    const userDocument = this
    const userObject = userDocument.toObject()

    delete userObject.password
    delete userObject.__v
    delete userObject.acc_validation_token
    delete userObject.acc_validation_token_expires

    return userObject
}

export default mongoose.model('User', UserSchema, 'test')
