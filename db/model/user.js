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
        avatar: { type: String },
        middleName: { type: String },
        phone_2: { type: String },
        whatssapp: { type: String },
        telegram: { type: String },
        email_2: { type: String },
        acc_confirmed: { type: Boolean, default: false },
        password_reset_token: { type: String },
        password_reset_token_expires: { type: Date },
        authToken: { type: String },
        acc_validation_token: { type: String },
        acc_validation_token_expires: { type: Date },
        schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
        favouriteSchools: [{ type: Schema.Types.ObjectId, ref: 'School' }]
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
    delete userObject._id
    delete userObject.__v
    delete userObject.acc_validation_token
    delete userObject.acc_validation_token_expires
    delete userObject.password_reset_token
    delete userObject.password_reset_token_expires

    return userObject
}

UserSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate()
    if (update.password) {
        const { password: plainPwd } = update

        if (plainPwd) {
            const password = await bcrypt.hash(plainPwd, 10)
            this.setUpdate({ ...update, password })
        }
    }
})

export default mongoose.model('User', UserSchema, 'test')
