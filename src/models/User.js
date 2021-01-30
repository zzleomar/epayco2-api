import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        document: { type: String, required: true },
        phone: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
)

const model = mongoose.model('User', userSchema)

module.exports = model
